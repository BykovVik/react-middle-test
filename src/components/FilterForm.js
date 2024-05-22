import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const FilterForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    position: '',
    archived: undefined
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Фильтровать по должности:</label>
        <select name="position" value={filters.position} onChange={handleChange}>
          <option value="">Все</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
      </div>
      <div>
        <label>Фильтровать по архиву:</label>
        <input type="checkbox" name="archived" checked={filters.archived} onChange={handleChange} />
      </div>
      <Button variant="primary" type="submit">Применить фильтр</Button>
    </form>
  );
};

export default FilterForm;