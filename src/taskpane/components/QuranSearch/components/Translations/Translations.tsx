import * as React from "react";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from "@fluentui/react";
import * as Translations from "./translations.json";
import { capitalizeFirstLetter, groupBy } from "../../../../../utils/utils";

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

export interface TranslationsProps {
  setTranslation: any;
}



export const TranslationOptions: React.FunctionComponent<TranslationsProps> = (props) => {
    const { setTranslation } = props;

    const [translate, setTranslate] = React.useState<boolean>(false);

    const onTranslateChange = (_event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
        setTranslate(checked);
        setTranslation(null);
    };

    const onTranslationChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
      setTranslation(Number(item.key));
    };

    const groupTranslationsByLanguage = (translations: any[]) => {
      const translationGroupedByLanguage = groupBy(translations, 'language_name');
      return Object.keys(translationGroupedByLanguage).map(language => {
        let languageTranslations: any[] = [{key: language, text: capitalizeFirstLetter(language), itemType: DropdownMenuItemType.Header}];
        const a = translationGroupedByLanguage[language].map(languageTranslation => {
          return {key: languageTranslation.id, text: languageTranslation.name }
        });
        languageTranslations = languageTranslations.concat(a);
        return languageTranslations;
      });
    };

    let translations = ([] as IDropdownOption[]).concat(...groupTranslationsByLanguage(Translations.translations));
    
    const translationOptions = (
        <Dropdown
          label="Translation"
          placeholder="Select translation"
          options={translations}
          onChange={onTranslationChange}
          styles={dropdownStyles}
          required
        />
    );

    return (
      <section>
        <Toggle label="Translate" checked={translate} onText="On" offText="Off" onChange={onTranslateChange} />
        {
            translate && translationOptions
        }
      </section>
    );
}
