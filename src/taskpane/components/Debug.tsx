import { PrimaryButton } from "@fluentui/react";
import React = require("react");
import { DocumentActionContext, QuranAyahActionStrategy } from "../../actions/ayah-actions";

function Debug(_props) {
  const actionContext = new DocumentActionContext();
  actionContext.setStrategy(new QuranAyahActionStrategy());

  const request = async (surah: number, ayah: number, script: string = "uthmani", translationId: number = null, tafsirId: number = null) => {
    
    let [ text, translation, tafsir ] = ["","", ""];

    text =  await fetch(`https://api.quran.com/api/v4/quran/verses/${script}?verse_key=${surah}%3A${ayah}`)
      .then((res) => res.json())
      .then((response) => {
        return response.verses[0][`text_${script}`];
      });

    if(translationId) {
        translation = await fetch(`https://api.quran.com/api/v4/quran/translations/${translationId}?verse_key=${surah}%3A${ayah}`)
        .then((res) => res.json())
        .then((response) => {
          return response.translations[0].text;
        });
    }

    if(tafsirId) {
        tafsir = await fetch(`https://api.quran.com/api/v4/quran/tafsirs/${tafsirId}?verse_key=${surah}%3A${ayah}`)
        .then((res) => res.json())
        .then((response) => {
          return response.tafsirs[0].text;
        });
    }

    return `${text} - ${translation} - ${tafsir}`;
  };

  const requestHadith = async (collection: string, hadith: number) => {
    let text =  await fetch(`https://api.sunnah.com/v1/collections/${collection}/hadiths/${hadith}`, { headers: {'x-api-key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'}})
      .then((res) => res.json())
      .then((_response) => {
        return "Test";
      });

    return text;
  };

  const handleInsert = async () => {
    let text = await request(3,10, "indopak",131);
    // let text = await requestHadith("bukhari", 1); // API Key required
    actionContext.insert(text);
  };

  return (
    <div>
      <PrimaryButton text="Insert" onClick={handleInsert} allowDisabledFocus />
    </div>
  );
}

export default Debug;
