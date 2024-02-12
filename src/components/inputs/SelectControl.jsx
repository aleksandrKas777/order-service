import classNames from 'classnames'
import {Controller, useFormContext} from 'react-hook-form'
import {FormLabel} from 'react-bootstrap'
import Select from 'react-select'


export const SelectControl = ({
  options = null,
  optionLabel,
  name,
  isMulti,
  label = '',
  className,
  placeholder = '',
  ...props
}) => {
  const {
    control,
  } = useFormContext()
  

  return (
    <FormLabel className={classNames(className, 'text-start w-100 mb-0')}>
      {label}
      <Controller
        name={name}
        control={control}
        render={({field}) => {
          // console.log(control)
          return (
            <Select
              options={options}
              {...field}
              isMulti={isMulti}
              placeholder={placeholder}
              getOptionLabel={(option) => option[optionLabel]}
              getOptionValue={(option) => option.id}
              // noOptionsMessage={'Нет данных'}
              isClearable={false}
              {...props}
            />
          )
        }}
      />
    </FormLabel>
  )
}
