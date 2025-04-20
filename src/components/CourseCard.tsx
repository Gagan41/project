interface CourseCardProps {
  title: string
  description: string
  price: number
}

export default function CourseCard({ title, description, price }: CourseCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-purple-300">{title}</h3>
      <p className="mt-2 text-gray-300">{description}</p>
      <p className="mt-4 font-bold">Price: ₹{price}</p>
    </div>
  )
}