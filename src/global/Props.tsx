interface AuthContextType {
  taskList: Array<PropCard>;
  onOpen: void;
  handleEdit: Function;
  handleDelete: Function;
  taskListBackup: Array<PropCard>;
  filter: (t: string) => void;
}
type PropCard = {
  valueRecord: string;
  accounted: boolean;
  description: string;
  flag: PropFlags;
  item: number;
};

type PropFlags = "fixo" | "parcelado" | "receita";
