import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

export interface DropdownListProps {
    label: string;
    placeholder: string;
    options: any[];
    required: boolean;
    value?: any;
    onChange?: any;
};


export const DropdownList: React.FunctionComponent<DropdownListProps> = (props) => {
  const { label, placeholder, options, required, onChange, value } = props;
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>(value);

  const onDropdownChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setSelectedItem(item);
    onChange(item.key);
  };

  return (
    <Dropdown
      label={label}
      selectedKey={selectedItem ? selectedItem.key : undefined}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={onDropdownChange}
      placeholder={placeholder}
      options={options}
      styles={dropdownStyles}
      required={required}
    />
  );
};
