import { useState } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ saveQueryParams }) => {
  const [localQuery, setLocalQuery] = useState('');

  const onChangeQuery = e => {
    setLocalQuery(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    saveQueryParams(localQuery);
  };

  return (
    <Header>
      <SearchForm onSubmit={onSubmitForm}>
        <SearchFormButton type="submit"></SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          name="search"
          autofocus
          placeholder="Search images and photos"
          onChange={onChangeQuery}
        />
      </SearchForm>
    </Header>
  );
};

// export default class SearchBar extends Component {
//   state = {
//     localQuery: '',
//   };
//
//   onChangeQuery = e => {
//     this.setState({ localQuery: e.target.value });
//   };
//
//   onSubmitForm = e => {
//     e.preventDefault();
//     this.props.saveQueryParams(this.state.localQuery);
//   };
//
//   render() {
//     return (
//       <Header>
//         <SearchForm onSubmit={this.onSubmitForm}>
//           <SearchFormButton type="submit"></SearchFormButton>
//           <SearchFormInput
//             type="text"
//             autocomplete="off"
//             name="search"
//             autofocus
//             placeholder="Search images and photos"
//             onChange={this.onChangeQuery}
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }
