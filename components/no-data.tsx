type NoDataProps = {
  message?: string;
};

export default function NoData({ message }: NoDataProps) {
  return (
    <div className="w-full px-6 py-20 text-center text-xl font-bold">
      {message || "No data to show"}
    </div>
  );
}
