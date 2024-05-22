import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateEmployee, addEmployee } from '../store/reducers';
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.employees);

  const isEdit = id !== 'new';
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    phone: '',
    birthday: '',
    role: '',
    isArchive: false
  });

  useEffect(() => {
    if (isEdit) {
      const existingEmployee = employees.find(emp => emp.id === Number(id));
      if (existingEmployee) {
        setEmployee(existingEmployee);
      }
    }
  }, [id, isEdit, employees]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee({
      ...employee,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateEmployee(employee));
    } else {
      dispatch(addEmployee({ ...employee, id: Date.now() }));
    }
    navigate('/');
  };

  return (
    <Container>
      <Row>
        <Col xs={12} className='header mb-4 mt-2'>
          {isEdit &&
            <h1>Изменение сотрудника</h1>
          }
          {!isEdit &&
            <h1>Создание сотрудника</h1>
          }
          <Link className='btn btn-danger' to="/">Вернуться к списку</Link>
        </Col>
        <Col>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Имя:</label>
              <input type="text" name="name" value={employee.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Телефон:</label>
              <input type="text" name="phone" value={employee.phone} onChange={handleChange} required />
            </div>
            <div>
              <label>Дата рождения:</label>
              <input type="text" name="birthday" value={employee.birthday} onChange={handleChange} required />
            </div>
            <div>
              <label>Должность:</label>
              <select name="role" value={employee.role} onChange={handleChange} required>
                <option value="" defaultValue>-- --</option>
                <option value="cook">Повар</option>
                <option value="waiter">Официант</option>
                <option value="driver">Водитель</option>
              </select>
            </div>
            <div>
              <label>В архиве:</label>
              <input type="checkbox" name="isArchive" checked={employee.isArchive} onChange={handleChange} />
            </div>
            <Button variant="primary" type="submit">Сохранить</Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeEdit;