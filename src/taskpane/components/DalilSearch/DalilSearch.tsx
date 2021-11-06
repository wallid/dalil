import * as React from "react";
import { IChoiceGroupOption, ChoiceGroup } from "@fluentui/react";
import QuranSearch from "../QuranSearch/QuranSearch";
import HadithSearch from "../HadithSearch/HadithSearch";
import Debug from "../Debug";

const DalilSearch = () => {

  const sources: IChoiceGroupOption[] = [
    // { key: "debug", text: "Debug" },
    { key: "quran", text: "Quran" },
    { key: "hadith", text: "Hadith" },
  ];

  const [source, setSource] = React.useState<IChoiceGroupOption>(sources[0]);

  const onChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
    setSource(option);
  };

  return (
    <div className="form-group">
      <ChoiceGroup selectedKey={source.key} options={sources} onChange={onChange} label="Source" required={true} />
      {
        {
          quran: <QuranSearch />,
          hadith: <HadithSearch />,
          debug: <Debug />
        }[source.key] || <Debug />
      }
    </div>
  );
};

DalilSearch.propTypes = {};

export default DalilSearch;
