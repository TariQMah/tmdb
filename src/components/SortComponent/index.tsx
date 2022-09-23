interface IProps {
  onSortClick: (e: any) => void;
  title: string;
  active?: boolean;
  value: string;
}

const Index = ({ onSortClick, title, value, active = false }: IProps) => {
  return (
    <div
      className={`filter ${active && "active"}`}
      onClick={() => onSortClick(value)}
    >
      {title}
    </div>
  );
};

export default Index;
