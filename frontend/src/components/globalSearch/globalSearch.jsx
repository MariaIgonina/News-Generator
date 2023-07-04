import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { newsSearch, getOptions } from '../../store/newsSlice';

import './globalSearch.css'
import "./calendar.css"
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from "react-datepicker";
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';

//Styles for select elements
const HEIGHT = 48;
const PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: HEIGHT * 7 + PADDING_TOP,
      width: 250,
    },
  },
};

export default function GlobalSearch({ setSearchIsOpen }) {
  
  const dispatch = useDispatch();

  const options = useSelector((state) => state.news.options)
  const token = useSelector((state) => state.auth.token);

  const optionsCategories = options.categories
  const optionsAuthors = options.authors
  const optionsSources = options.sources
  const searchCheck = useSelector((state) => state.news.search);
  const [saveSearch, setSaveSearch] = useState(false)
  const [search, setSearch] = useState({
    keyword: '',
    categories: [],
    authors: [],
    sources: [],
    startDate: '',
    endDate: '',
    saveSearch: false
  });

  //Date filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSearch((search) => ({
      ...search,
      [name]: value
    }))
  };

  //Categories filtering
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  //Authors filtering
  const [authors, setAuthors] = useState([]);

  const handleAuthorChange = (event) => {
    const {
      target: { value },
    } = event;
    setAuthors(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  //Sources filtering
  const [sources, setSources] = useState([]);

  const handleSourceChange = (event) => {
    const {
      target: { value },
    } = event;
    setSources(
      typeof value === 'string' ? value.split(',') : value,
      );
    };
  
  //Save search option
  const handleCheckbox = () => { setSaveSearch(!saveSearch) } 

  //Send request to search
  const handleSubmit = (e) => {
    e.preventDefault();

    const newSearch = {
      ...search,
      categories: categories,
      authors: authors,
      sources: sources,
      startDate: startDate,
      endDate: endDate,
      saveSearch: saveSearch,
    };

    dispatch(newsSearch(newSearch));
    if (searchCheck.length === 0) {
      // alert('Sorry, but your search does not match any results. Please try again.')
    }
    setSearchIsOpen(false)
  }

  //Options for thr droplists
  useEffect(() => {
    dispatch(getOptions());
  }, [dispatch])

  return (
    <div className='search-panel'>
      <CloseIcon 
        className='close-button'
        onClick={() => setSearchIsOpen(false)}
      />
      <form
        className='search-form'
        onSubmit={handleSubmit}
      >

        <label className='search-label'>Date Interval</label>
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />

        <label className='search-label'>Keywords</label>
        <TextField
          className='search-inputs'
          id="outlined-basic"
          variant="outlined"
          name="keyword"
          onChange={handleChange}
          value={search.keyword}
          size="small" 
        />

        {optionsCategories && (
          <>
            <label className='search-label'>Categories</label>
            <Select
              className='search-inputs'
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={categories}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Categories" />}
              MenuProps={MenuProps}
              size="small"
            >
              {optionsCategories.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </>
          )
        }

        {optionsSources && (
          <>
            <label className='search-label'>Sources</label>
            <Select
              className='search-inputs'
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={sources}
              onChange={handleSourceChange}
              input={<OutlinedInput label="Sources" />}
              MenuProps={MenuProps}
              size="small"
            >
              {optionsSources.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </>
          )
        }

        {optionsAuthors && (
          <>
            <label className='search-label'>Authors</label>
            <Select
              className='search-inputs'
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={authors}
              onChange={handleAuthorChange}
              input={<OutlinedInput label="Authors" />}
              MenuProps={MenuProps}
              size="small"
            >
              {optionsAuthors.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </>
          )
        }

        {token &&
          <div className='checkbox-group'>
            <label className='search-label'>
              I want to receive suggestions based on this search
            </label>
            <Checkbox 
              className='check-search'
              size=""
              onChange={() => handleCheckbox()}
            />
          </div>
        }

        <Button
          className='search-button'
          onClick={handleSubmit}
        >Search
        </Button>

      </form>
    </div>
  )
}