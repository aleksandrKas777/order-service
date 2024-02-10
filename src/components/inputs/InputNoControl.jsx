import {FormControl, FormLabel} from 'react-bootstrap'
import classNames from 'classnames'

export const InputNoControl = ({
                                 register = {},
                                 type,
                                 name = '',
                                 label = '',
                                 className,
                                 placeholder = '',
                                 ...props
                               }) => {
  return (
    <FormLabel className={classNames(className, 'text-start')}>
      {label}
      <FormControl
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={''}
        {...props}
      />
    </FormLabel>
  )
}
