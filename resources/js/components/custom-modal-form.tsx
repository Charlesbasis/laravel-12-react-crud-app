import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddButtonProps {
  id: string;
  label: string;
  className: string;
  icon: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | undefined;
}

interface FieldProps {
  id: string;
  key: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  autocomplete?: string;
  tabIndex: number;
  autoFocus?: boolean;
  accept?: string;
  rows?: number;
  className?: string;
}

interface ButtonProps {
  key: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  label: string;
  variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | undefined;
  className: string;
}

interface CustomModalFormProps {
  addButton: AddButtonProps;
  title: string;
  description: string;
  fields: FieldProps[];
  buttons: ButtonProps[];
  data: Record<string, any>;
  setData: (name: string, value: any) => void;
  processing: boolean;
}

export const CustomModalForm = ({ addButton, title, description, fields, buttons, data, setData, processing }: CustomModalFormProps) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>

          <Button
            id={addButton.id}
            variant={addButton.variant}
            className={addButton.className}
            type={addButton.type}
          >
            {addButton.icon && <addButton.icon />} {addButton.label}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>

            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            {fields.map((field) => (
              <div key={field.id} className="grid gap-2">
                <Label htmlFor={field.id}>
                  {field.label}
                </Label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={field.rows}
                    autoComplete={field.autocomplete}
                    tabIndex={field.tabIndex}
                    className={field.className}
                    onChange={(e) => setData(field.name, e.target.value)}
                    value={data[field.name]}
                  >
                  </textarea>
                ) : field.type === 'file' ? (
                  <Input
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    autoComplete={field.autocomplete}
                    tabIndex={field.tabIndex}
                    accept={field.accept}
                    type={field.type}
                  >
                  </Input>
                ) : (
                  <Input
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    autoComplete={field.autocomplete}
                    tabIndex={field.tabIndex}
                    type={field.type}
                  >
                  </Input>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            {buttons.map((button) => {
              if (button.key === 'cancel') {
                return (
                  <DialogClose asChild key={button.key}>
                    <Button
                      key={button.key}
                      variant={button.variant}
                      className={button.className}
                      type={button.type}>
                      {button.label}
                    </Button>
                  </DialogClose>
                );
              }
              else if (button.key === 'submit') {
                return (
                  <Button
                    key={button.key}
                    variant={button.variant}
                    className={button.className}
                    type={button.type}>
                    {button.label}
                  </Button>
                );
              }
            })}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}