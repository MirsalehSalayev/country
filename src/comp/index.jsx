import React, { useEffect, useState } from 'react';
import "./style.css"

function Cards() {
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState("")
    const [theme, setTheme] = useState('light');
    const [region, setRegion] = useState('');

    useEffect(() => {
        async function getData(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data.region)
                if (Array.isArray(data)) {
                    setProduct(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        const url = 'https://restcountries.com/v3.1/all';
        getData(url).then(data => console.log(data));
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const InputFilterAz = (property) => {
        if (product[0] && property in product[0]) {
            setProduct([...product.sort((a, b) => (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0))])
        }
    }

    const InputFilterZa = (property) => {
        if (product[0] && property in product[0]) {
            setProduct([...product.sort((a, b) => (a[property] < b[property]) ? 1 : ((b[property] < a[property]) ? -1 : 0))])
        }
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    }

    const filteredProducts = product.filter((item) => {
        return item.name.common.toLowerCase().includes(search.toLowerCase()) && (!region || item.region === region);
    });

    return (
        <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
            <button onClick={toggleTheme}>Toggle theme</button>
            <select onChange={handleRegionChange}>
                <option value="Africa">africa</option>
                <option value="Asia">asia</option>
                <option value="Europe">avropa</option>
                <option value="Americas">c.amerika</option>
                <option value="Americas">sh.amerika</option>
                <option value="Oceania">avstralia</option>
            </select>

            <input type="text" onChange={handleSearch} />
            <button onClick={() => InputFilterAz('common')}> az</button>
            <button onClick={() => InputFilterZa('name')}> za</button>

            {filteredProducts.map((x, index) => (
                <div key={index}>
                    <img src={x.flags.png} alt="" />
                    <h2>{x.name.common}</h2>
                    <p>{x.description}</p>
                    <p>region:{x.region}</p>
                    <p>popul:{x.population}</p>
                </div>
            ))}

        </div>
    );
}

export default Cards;
