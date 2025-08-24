import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddItemProps {
  onClick: () => void
  text: string
}

export default function AddItem({ onClick, text = 'Add New' }: AddItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" onClick={onClick}>
        <Plus size={16} className="md:mr-2" />
        <span className="hidden md:block">{text}</span>
      </Button>
    </div>
  )
}
