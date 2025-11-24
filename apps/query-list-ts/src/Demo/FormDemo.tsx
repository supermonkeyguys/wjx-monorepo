import { produce } from "immer";
import { useState, type ChangeEvent, type FC } from "react";

const FormDemo: FC = () => {
  // const [text, setText] = useState<string>('hello')
  // function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //     setText(event.target.value)
  // }
  // function genHtml() {
  //     return { __html: text.replaceAll('\n', '<br>') }
  // }

  // const [gender, setGender] = useState('female')
  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //     setGender(event.target.value)
  // }

  // const [checked,setChecked] = useState(false)
  // function toggleChecked() {
  //     setChecked(!checked)
  // }

  // const [selectedCityList, setSelectedCityList] = useState<string[]>([])
  // function handleCityChange(event: ChangeEvent<HTMLInputElement>) {
  //     const city = event.target.value
  //     if (selectedCityList.includes(city)) {
  //         setSelectedCityList(produce(draft => {
  //             const id = draft.findIndex(d => d === city)
  //             draft.splice(id, 1)
  //         }))
  //     }
  //     else {
  //         setSelectedCityList(produce(draft => {
  //             draft.push(city)
  //         }))
  //     }
  // }

  const [lang, setLang] = useState("JS");

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setLang(e.target.value);
  }

  return (
    <>
      <p>Form elems demo</p>
      <div>
        {/* <input value={text} onChange={handleChange} /> */}
        {/* <textarea value={text} onChange={handleChange}></textarea> */}
        {/* <p dangerouslySetInnerHTML={genHtml()}></p> */}

        {/* <label htmlFor="radio1">男</label>
                <input type="radio" name="gender" id="radio1" value='male' onChange={handleChange} checked={gender === 'male'} />
                <label htmlFor="radio2">女</label>
                <input type="radio" name="gender" id="radio2" value="female" onChange={handleChange} checked={gender === 'female'} />
                <button onClick={() => console.log(gender)}>printf</button> */}

        {/* <label htmlFor="checkbox1">选中</label>
                <input type="checkbox" id="checkbox1" checked={checked} onChange={toggleChecked} /> */}

        {/* <label htmlFor="checkbox1">深圳</label>
                <input type="checkbox" id="checkbox1" value='shenzhen' checked={selectedCityList.includes('shenzhen')} onChange={handleCityChange} />
                <label htmlFor="checkbox2">北京</label>
                <input type="checkbox" id="checkbox2" value="beijing" checked={selectedCityList.includes('beijing')} onChange={handleCityChange} />
                <label htmlFor="checkbox3">上海</label>
                <input type="checkbox" id="checkbox3" value='shanghai' checked={selectedCityList.includes('shanghai')} onChange={handleCityChange} />

                {JSON.stringify(selectedCityList)}
                <input type="hidden" name="cities" value={JSON.stringify(selectedCityList)} /> */}

        <select value={lang} onChange={handleSelectChange}>
          <option value="js">JS</option>
          <option value="ts">TS</option>
          <option value="c++">C++</option>
          <option value="java">JAVA</option>
        </select>
      </div>
    </>
  );
};

export default FormDemo;
