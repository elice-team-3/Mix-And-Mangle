import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Home() {
  return (
    <div>
      <Button variant="dark">다음</Button>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="hello" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Item 1</SelectItem>
          <SelectItem value="2">Item 2</SelectItem>
          <SelectItem value="3">Item 3</SelectItem>
          <SelectItem value="4">Item 4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
