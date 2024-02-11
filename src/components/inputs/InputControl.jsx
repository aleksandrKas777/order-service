import {FormControl, FormLabel} from 'react-bootstrap'
import classNames from 'classnames'
import {Controller, useFormContext} from 'react-hook-form'


export const InputControl = ({
  name,
  label = '',
  className,
  placeholder = '',
  w = 100,
  inputClassName,
  controllerContainerClassName,
  DeleteButton,
  ...props
}) => {
  const {
    control,
    getFieldState,
    formState: {errors},
  } = useFormContext()

  const isError = getFieldState(name).invalid
  const messageError = getFieldState(name).error?.message

  return (
    <FormLabel className={classNames(className, `text-start w-${w} mb-0`)}>
      {label}
      <Controller
        name={name}
        control={control}
        render={({field}) => {
          return (
            <div
              className={classNames(
                controllerContainerClassName,
                'd-flex gap-3',
              )}
            >
              <FormControl
                {...field}
                placeholder={placeholder}
                className={classNames(
                  isError && 'border-danger',
                  inputClassName,
                )}
                {...props}
              />
              {DeleteButton && DeleteButton}
            </div>
          )
        }}
      />
      {/*<TextError isError={isError} messageError={messageError} />*/}
    </FormLabel>
  )
}
