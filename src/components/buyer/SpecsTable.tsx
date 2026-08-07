export default function SpecsTable({
  title = 'Specs',
  rows,
}: {
  title?: string
  rows: { label: string; value: string }[][]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <caption className="sr-only">{title}</caption>
        <tbody>
          {rows.map((group, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-surface' : 'bg-paper'}>
              {group.map((cell) => (
                <td key={cell.label} className="border-b border-line px-4 py-3 align-top">
                  <div className="tcs-mono text-xs uppercase tracking-[0.08em] text-muted">{cell.label}</div>
                  <div className="mt-0.5 text-ink">{cell.value}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
