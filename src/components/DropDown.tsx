import React from 'react'
import { Select } from 'antd';

export default function DropDown() {
    // function changeLanguage(lang: string) {
    //     localStorage.setItem("locales", lang);
    //     window.location.reload();
    // }


    function changeLanguage(lang: any) {
        console.log(lang.value);
        
        localStorage.setItem("locales", lang.value);
        window.location.reload();
    }


    const handleChange = (value: any) => {
        console.log(value);
    };
      
      const handleOptionClick = (value: { label: any; }) => {
        console.log(`Clicked on ${value.label}`);
    };

    return (
        // <div className="dropdown" style={{position: 'absolute', bottom: '70%', right: '0'}}>
        //     <button
        //         className="btn btn-primary dropdown-toggle"
        //         type="button"
        //         id="dropdownMenuButton"
        //         data-mdb-toggle="dropdown"
        //         aria-expanded="false"
        //         style={{backgroundColor: 'blue'}}
        //     >
        //         Dropdown button
        //     </button>
        //     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        //         <li><span onClick={() => {
        //             changeLanguage('vi')
        //         }} className="dropdown-item">Tiếng Việt</span></li>
        //         <li><span onClick={() => {
        //             changeLanguage('en')
        //         }} className="dropdown-item">Tiếng Anh</span></li>
        //     </ul>
        // </div>

        <Select
            labelInValue
            defaultValue={{ value: 'language', label: 'Chọn ngôn ngữ' }}
            style={{ width: 150, position: 'absolute', right: '100px', top: '0'}}
            onChange={(e) => {changeLanguage(e)}}
            onSelect={handleOptionClick}
        >
            <Select.Option value="language" label="language" onClick={() => {changeLanguage('vi')}}>
                Chọn ngôn ngữ
            </Select.Option>
            <Select.Option value="vi" label="Tiếng Việt" onClick={() => {changeLanguage('vi')}}>
                🇻🇳 Tiếng Việt
            </Select.Option>
            <Select.Option value="en" label="Tiếng Anh" onClick={() => {changeLanguage('en')}}>
                🇬🇧 Tiếng Anh
            </Select.Option>
        </Select>

    )
}


