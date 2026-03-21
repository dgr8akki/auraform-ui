export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 border-b-2 border-current/10 font-semibold">
              Prop
            </th>
            <th className="text-left p-3 border-b-2 border-current/10 font-semibold">
              Type
            </th>
            <th className="text-left p-3 border-b-2 border-current/10 font-semibold">
              Default
            </th>
            <th className="text-left p-3 border-b-2 border-current/10 font-semibold">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="p-3 border-b border-current/5 font-mono text-xs font-semibold">
                {prop.name}
              </td>
              <td className="p-3 border-b border-current/5 font-mono text-xs text-current/70">
                {prop.type}
              </td>
              <td className="p-3 border-b border-current/5 font-mono text-xs">
                {prop.default ?? "—"}
              </td>
              <td className="p-3 border-b border-current/5 text-current/80">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
