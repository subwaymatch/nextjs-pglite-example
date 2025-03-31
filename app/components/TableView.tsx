import React from "react";

type Row = {
  [key: string]: any; // changed to `any` to allow nested objects
};

type Field = {
  name: string;
  dataTypeID: number;
};

type DataItem = {
  rows: Row[];
  fields: Field[];
  affectedRows: number;
};

type Props = {
  data: DataItem[];
};

export default function TableView({ data }: Props) {
  if (!data.length) return <p>No data available.</p>;

  const { fields, rows } = data[0]; // Assuming single data item

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  return (
    <table className="border-collapse border border-gray-400">
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field.name} className="border border-gray-400 px-2 py-1">
              {field.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {fields.map((field) => (
              <td key={field.name} className="border border-gray-400 px-2 py-1">
                {formatValue(row[field.name])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
