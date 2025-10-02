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
    <div className='text-xl font-bold mt-20 p-5 '>
      <div className='mt-3 h-28 p-4 w-fit mx-auto flex justify-center items-center gap-4 flex-col'>
        <div>Filter Your Posts with Status</div>

        <Select onValueChange={onFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="posted">Posted</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default FilterCard
