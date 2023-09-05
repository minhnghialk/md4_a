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
            style={{ width: 150, position: 'absolute', bottom: '70%', right: '0'}}
            onChange={(e) => {changeLanguage(e)}}
            onSelect={handleOptionClick}
        >
            <Select.Option value="language" label="language" onClick={() => {changeLanguage('vi')}}>
                Chọn ngôn ngữ
            </Select.Option>
            <Select.Option value="vi" label="Tiếng Việt" onClick={() => {changeLanguage('vi')}}>
                Tiếng Việt
            </Select.Option>
            <Select.Option value="en" label="Tiếng Anh" onClick={() => {changeLanguage('en')}}>
                Tiếng Anh
            </Select.Option>
        </Select>

    )
}

// import React from 'react';
// import { Select } from 'antd';

// const handleChange = (value: { value: string; label: React.ReactNode }) => {
//   console.log(value); 
// };

// const App: React.FC = () => (
//   <Select
//     labelInValue
//     defaultValue={{ value: 'vi', label: 'Tiếng Việt' }}
//     style={{ width: 120 }}
//     onChange={handleChange}
//     options={[
//       {
//         value: 'vi',
//         label: 'Tiếng Việt',
    
//       },
//       {
//         value: 'en',
//         label: 'Tiếng Anh',
//       },
//     ]}
//   />
// );

// export default App;

// import React from 'react';
// import { Select } from 'antd';
// import { changeLanguage } from 'i18next';

// const handleChange = (value: any) => {
//   console.log(value);
// };

// const handleOptionClick = (value: { label: any; }) => {
//   console.log(`Clicked on ${value.label}`);
// };

// const App: React.FC = () => (
//   <Select
//     labelInValue
//     defaultValue={{ value: 'vi', label: 'Tiếng Việt' }}
//     style={{ width: 120 }}
//     onChange={handleChange}
//     onSelect={handleOptionClick}
//   >
//     <Select.Option value="vi" label="Tiếng Việt" onClick={() => {changeLanguage('vi')}}>
//         Tiếng Việt
//     </Select.Option>
//     <Select.Option value="en" label="Tiếng Anh" onClick={() => {changeLanguage('en')}}>
//         Tiếng Anh
//     </Select.Option>
//   </Select>
// );

// export default App;


