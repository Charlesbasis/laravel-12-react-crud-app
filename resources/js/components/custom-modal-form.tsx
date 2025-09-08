import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "./input-error";

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
  handleSubmit: (data: any) => void;
  errors: Record<string, string>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'view' | 'edit';
  previewImage: string | null;
}

export const CustomModalForm = ({
  addButton,
  title,
  description,
  fields,
  buttons,
  data,
  setData,
  processing,
  handleSubmit,
  errors,
  open,
  onOpenChange,
  mode = 'create',
  previewImage,
}: CustomModalFormProps) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={data[field.name] || ''}
                    disabled={processing || mode === 'view'}
                  >
                  </textarea>
                ) : field.type === 'file' ? (
                  <div className="space-y-2">
                    {mode !== 'create' && previewImage && (
                      <img src={previewImage} alt={data?.[field.key]} />
                    )}
                    {mode !== 'view' && (
                      <Input
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        autoComplete={field.autocomplete}
                        tabIndex={field.tabIndex}
                        accept={field.accept}
                        type='file'
                        onChange={(e) => setData(field.name, e.target.files ? e.target.files[0] : null)}
                      >
                      </Input>
                    )}
                  </div>
                ) : (
                  <Input
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    autoComplete={field.autocomplete}
                    tabIndex={field.tabIndex}
                    type={field.type}
                    autoFocus={field.autoFocus}
                    onChange={(e) => setData(field.name, e.target.value)}
                    value={data[field.name] || ''}
                    disabled={processing || mode === 'view'}
                  >
                  </Input>
                )}

                <InputError message={errors?.[field.name]} />
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
              else if (mode !== 'view') {
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
        </form>
      </DialogContent>
    </Dialog>
  )
}