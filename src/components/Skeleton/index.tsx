import Skeleton from "react-loading-skeleton";
interface IProps {
  cssClass?: string;
}
const Index = ({ cssClass }: IProps) => {
  return (
    <div className={`skeleton ${cssClass}`}>
      <Skeleton height="100%" />
    </div>
  );
};

export default Index;
