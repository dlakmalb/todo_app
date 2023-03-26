import axios from 'axios';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import Navbar from './components/Navbar';
import Pagination from './components/Pagination';
import { Card, Form, Modal, Row } from 'react-bootstrap';

const PAGE_SIZE = 50;

const TodoList = (props) => {
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTodo, setSelectedTodo] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        const { data: todos } = await axios.get(
            'https://jsonplaceholder.typicode.com/todos'
        );

        setTodos(todos);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClickPrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleClickNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleClickLogout = () => {
        props.history.replace('/');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTodo({});
    };

    const onclickTitle = async (id) => {
        const { data: selectedTodo } = await axios.get(
            `https://jsonplaceholder.typicode.com/todos/${id}`
        );

        setSelectedTodo(selectedTodo);
        setShowModal(true);
    };

    if (!Object.keys(todos).length) {
        return (
            <>
                <Navbar onclickLogout={handleClickLogout} />
                <div className="d-flex justify-content-center pt-4">
                    Todo(s) not available
                </div>
            </>
        );
    }

    const renderTable = () => {
        const paginatedTodos = paginate(todos, currentPage, PAGE_SIZE);

        return (
            <div className="p-3 todo-table">
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead>
                        <tr className="text-center table-primary">
                            <th>Id</th>
                            <th>Title</th>
                            <th>completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(paginatedTodos).length ? (
                            paginatedTodos.map((todo) => {
                                const { id, title, completed } = todo;
                                return (
                                    <tr key={id}>
                                        <th className="text-center">{id}</th>
                                        <td
                                            className="cursor"
                                            onClick={() => onclickTitle(id)}
                                        >
                                            {title}
                                        </td>
                                        <td className="text-center">
                                            {completed ? 'Yes' : 'No'}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <div className="d-flex justify-content-center">
                                Todos not available
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderModal = () => (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header>
                <Modal.Title>Todo Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Form.Group>
                        <Form.Label class="fw-semibold fs-6">Title</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Card.Subtitle className="mb-2 text-muted">
                            {selectedTodo.title}
                        </Card.Subtitle>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label class="fw-semibold fs-6">
                            Completed Status
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Card.Subtitle className="mb-2 text-muted">
                            {selectedTodo.completed ? 'Yes' : 'No'}
                        </Card.Subtitle>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label class="fw-semibold fs-6">
                            User Id
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Card.Subtitle className="mb-2 text-muted">
                            {selectedTodo.userId}
                        </Card.Subtitle>
                    </Form.Group>
                </Row>
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            <Navbar onclickLogout={handleClickLogout} />
            {renderTable()}
            <div className="p-3 d-flex justify-content-end">
                <Pagination
                    itemsCount={Object.keys(todos).length}
                    pageSize={PAGE_SIZE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onClickPrevious={handleClickPrevious}
                    onClickNext={handleClickNext}
                />
            </div>
            {renderModal()}
        </>
    );
};

const paginate = (todos, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;

    return _(todos).slice(startIndex).take(pageSize).value();
};

export default TodoList;
