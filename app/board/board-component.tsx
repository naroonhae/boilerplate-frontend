import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Column<T> = {
  header: string;
  value: (key: T) => string | React.ReactNode;
  className?: string;
};

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export default function BoardComponent<T>({ data, columns, className }: Props<T>) {
  return (
    <Table className={`${className} table-fixed`}>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={`table-row-${index}`}>
            {columns.map((column) => (
              <TableCell key={`table-row-${column.header}-${index}`} className={column.className}>
                {column.value(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
