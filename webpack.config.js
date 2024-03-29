const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	entry: './src/index.tsx',
	devtool: isDevelopment && 'eval-source-map',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.m?[tj]sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/env',
							['@babel/react', { runtime: 'automatic' }],
						],
						plugins: ['react-hot-loader/babel'],
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly: isDevelopment,
				},
			},
			{
				test: /\.less$/i,
				oneOf: [
					{
						resourceQuery: /theme/,
						use: [
							{
								loader: 'file-loader',
								options: {
									name: 'css/[name].css',
								},
							},
							{
								loader: 'less-loader',
								options: {
									lessOptions: {
										javascriptEnabled: true,
									},
								},
							},
						],
					},
					{
						use: [
							MiniCssExtractPlugin.loader,
							'css-loader',
							{
								loader: 'less-loader',
								options: {
									lessOptions: {
										javascriptEnabled: true,
									},
								},
							},
						],
					},
				],
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							typescript: true,
							svgoConfig: {
								plugins: [
									{
										name: 'preset-default',
										params: {
											overrides: {
												cleanupIDs: false,
											},
										},
									},
								],
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
		alias: {
			'@app/config': path.join(
				__dirname,
				'config',
				isDevelopment ? 'development' : 'production'
			),
		},
		plugins: [new TsconfigPathsPlugin()],
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		static: {
			directory: path.join(__dirname, 'public'),
			watch: {
				ignored: '**/node_modules',
			},
		},
		compress: true,
		port: 9001,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			title: 'Splitey',
		}),
		isDevelopment && new ForkTsCheckerWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	].filter(Boolean),
};
