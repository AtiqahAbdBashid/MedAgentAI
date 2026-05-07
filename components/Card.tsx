export default function Card({ title, value, color }: any) {
    return (
        <div className="border rounded-xl p-4 bg-white dark:bg-gray-800">
            <p className="text-sm text-gray-500">{title}</p>
            <p className={`text-xl font-semibold ${color === "green" ? "text-green-600" : ""}`}>
                {value}
            </p>
        </div>
    );
}