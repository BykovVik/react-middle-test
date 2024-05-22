import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterForm from './FilterForm';
import { Col, Container, Row } from 'react-bootstrap'
import profilePhoto from '../data/profile.png'

const EmployeeList = () => {
  const employees = useSelector(state => state.employees.employees);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleFilter = (filters) => {
    let updatedList = employees;
    if (filters.position) {
      updatedList = updatedList.filter(emp => emp.role === filters.position);
    }
    if (filters.archived !== undefined) {
      updatedList = updatedList.filter(emp => emp.isArchive === filters.archived);
    }
    setFilteredEmployees(updatedList);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    const sortedList = [...filteredEmployees].sort((a, b) => {
      if (option === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        const dateA = new Date(a.birthday.split('.').reverse().join('-'));
        const dateB = new Date(b.birthday.split('.').reverse().join('-'));
        return dateA - dateB;
      }
    });
    setFilteredEmployees(sortedList);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} className='header mb-4 mt-2'>
          <h1>Список сотрудников</h1>
          <Link className='btn btn-danger' to="/edit/new">Добавить сотрудника</Link>
        </Col>
        <Col xs={12}>
          <form>
            <label>Сортировка:</label>
            <select onChange={handleSort} value={sortOption}>
              <option value="name">Имя</option>
              <option value="birthday">Дата рождения</option>
            </select>
          </form>
        </Col>
        <Col xs={12}>
          <FilterForm onFilter={handleFilter} />
        </Col>
        <Col xs={12}>
          {filteredEmployees.map(emp => (
            <div key={emp.id} className='data-box'>
              <Link to={`/edit/${emp.id}`}>
                <div>
                  <img src={profilePhoto} alt='pic'></img>
                </div>
                <div>
                  <p><b>Имя: </b>{emp.name}</p>
                  <p><b>Должность: </b>{emp.role}</p>
                  <p><b>Телефон: </b>{emp.phone}</p>
                  <p><b>Дата рождения: </b>{emp.birthday}</p>
                </div>
              </Link>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeList;