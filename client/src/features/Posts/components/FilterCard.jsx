import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FilterCard = ({ onFilter }) => {
  return (
    <div className="pt-20 m-10 text-white">
      <div className="h-20 mx-auto flex items-center justify-center gap-5 p-6 rounded-xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 shadow-lg hover:shadow-blue-500/20 transition duration-200">
        
        <div className="text-lg font-semibold tracking-wide text-gray-200">
          🔎 Filter Your Posts
        </div>

        <Select onValueChange={onFilter}>
          <SelectTrigger className="w-[220px] bg-gray-800 text-gray-200 border border-gray-600 rounded-lg shadow-md hover:border-blue-400 transition duration-150 pl-4">
            <SelectValue placeholder="Select a Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-xl">
            <SelectGroup>
              <SelectItem value="all">🌐 All</SelectItem>
              <SelectItem value="pending">⏳ Pending</SelectItem>
              <SelectItem value="scheduled">📅 Scheduled</SelectItem>
              <SelectItem value="posted">✅ Posted</SelectItem>
              <SelectItem value="failed">❌ Failed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default FilterCard
