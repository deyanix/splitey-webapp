import './Loading.less';
import SpliteyLoading from '../SpliteyLoading/SpliteyLoading';

const Loading: React.FC = () => {
	return (
		<div className="loading-backdrop">
			<div className="loading">
				<SpliteyLoading />
			</div>
		</div>
	);
};

export default Loading;
