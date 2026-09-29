/* Luminari wordmark (unchanged from the original build), always centred on its own axis. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <b>LUMINARI</b>
      <span>CLEANING</span>
    </span>
  );
}
