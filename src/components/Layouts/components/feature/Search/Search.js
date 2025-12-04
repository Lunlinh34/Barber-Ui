import { useState, useEffect, useRef } from 'react';
import { IconSearch, IconCircleX, IconLoader } from '@tabler/icons-react';
import HeadlessTippy from '@tippyjs/react/headless';

import * as searchServices from '~/services/searchServices';
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Layouts/components/common/Popper';
import SearchProductItem from '~/components/feature/SearchProductItem';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debouncedValue);
            if (result === undefined) {
                setSearchResult([]);
            } else {
                setSearchResult(result);
                setLoading(false);
            }
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>SẢN PHẨM</h4>
                        {searchResult.map((result) => (
                            <SearchProductItem
                                key={result.proID}
                                data={result}
                                setSearchResult={setSearchResult}
                                setSearchValue={setSearchValue}
                            />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm sản phẩm..."
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <IconCircleX color="#333" size={20} stroke={2} />
                    </button>
                )}
                {loading && <IconLoader className={cx('loading')} size={20} stroke={2} />}
                <button className={cx('search-btn')}>
                    <IconSearch color="#8c8c8d" stroke={2} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
