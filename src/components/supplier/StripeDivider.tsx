export default function StripeDivider({ label }: { label?: string }) {
  return (
    <div role="separator" aria-label={label} className="tcs-stripe w-full" />
  )
}
