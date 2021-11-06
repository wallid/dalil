import { Dropdown, IDropdownOption, IDropdownStyles, PrimaryButton } from "@fluentui/react";
import * as React from "react";
import { DocumentActionContext, QuranAyahActionStrategy } from "../../../actions/ayah-actions";
import { TranslationOptions } from "./components/Translations/Translations";
import * as Surahs from "./surahs.json";

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

export interface QuranSearchValues {
  surah: string | number;
  ayah: string | number;
  translation: string | number;
}

function QuranSearch(_props) {
  const documentActionContext = new DocumentActionContext();
  documentActionContext.setStrategy(new QuranAyahActionStrategy());


  // statex
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [verses, setVerses] = React.useState([]);

  const [values, setValues] = React.useState<QuranSearchValues>({
    surah: null,
    ayah: null,
    translation: null
  });

  // options
  const chapters = Surahs.chapters.map((chapter) => {
    return { key: chapter.id, text: `${chapter.name_simple}` };
  });


  // form
  const handleSurahChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {

    // update verses count
    let chapterVerseCount = Surahs.chapters.find(c => c.id == Number(item.key)).verses_count;
    const ayahOptions = Array.from({length: chapterVerseCount}, (_, i) => i + 1).map(a => { return {key: a, text: a} })
    setVerses(ayahOptions);

    setValues({ ...values, surah: item.key, ayah: null });
  };

  const handleAyahChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setValues({ ...values, ayah: item.key });
  };

  const handleTranslationChange = (translation) => {
    setValues({ ...values, translation: translation});
  };

  const handleInsert = async () => {
    const { surah, ayah, translation } = values;
    const script = "uthmani";
    let text =  await fetch(`https://api.quran.com/api/v4/quran/verses/${script}?verse_key=${surah}%3A${ayah}`)
      .then((res) => res.json())
      .then((response) => {
        return response.verses[0][`text_${script}`];
      });

    if(translation) {
      let translationText = await fetch(`https://api.quran.com/api/v4/quran/translations/${translation}?verse_key=${surah}%3A${ayah}`)
      .then((res) => res.json())
      .then((response) => {
        return response.translations[0].text;
      });

      text = `${text} | ${translationText}`
    }

    documentActionContext.insert(text);
  };


  return (
    <section>
      <h1>Quran</h1>
        <Dropdown
          label="Surah"
          placeholder="Select surah"
          options={chapters}
          selectedKey={values.surah ? values.surah : undefined}
          onChange={handleSurahChange}
          styles={dropdownStyles}
          required
        />
        <Dropdown
          label="Ayah"
          placeholder="Select ayah"
          options={verses}
          selectedKey={values.ayah ? values.ayah : undefined}
          onChange={handleAyahChange}
          styles={dropdownStyles}
          required
        />
        <TranslationOptions setTranslation={handleTranslationChange} />
        <div className="actions" style={{ marginTop: 10 }}>
          <PrimaryButton type="submit" text="Insert" onClick={handleInsert} allowDisabledFocus />
        </div>
      { JSON.stringify(values)}
    </section>
  );
}

QuranSearch.propTypes = {};

export default QuranSearch;
