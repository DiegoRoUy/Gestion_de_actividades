import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import { EmojiBartFeliz } from './EmojiBartFeliz';
import { EmojiBartSerio } from './EmojiBartSerio';
import { EmojiBartTriste } from './EmojiBartTriste';

const SituacionPersonal = () => {
    const puntaje = useSelector((state) => state.puntajesSlices);

    useEffect(() => {
        renderCard();


    }, [puntaje])

    const renderCard = () => {
        if (puntaje > 0) {
            return (
                <Card border="success" style={{ width: '11rem' }}>
                    <Card.Header>Situación Personal</Card.Header>
                    <Card.Body>
                        <Card.Title><EmojiBartFeliz size={100} /></Card.Title>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>
            );
        } else if (puntaje === 0) {
            return (
                <Card border="warning" style={{ width: '11rem' }}>
                    <Card.Header>Situación Personal</Card.Header>
                    <Card.Body>
                        <Card.Title><EmojiBartSerio size={100} /></Card.Title>
                        <Card.Text> </Card.Text>
                    </Card.Body>
                </Card>
            );
        } else {
            return (
                <Card border="danger" style={{ width: '11rem' }}>
                    <Card.Header>Situación Personal</Card.Header>
                    <Card.Body>
                        <Card.Title><EmojiBartTriste size={100} /></Card.Title>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>
            );
        }
    }

    return (
        <div>
            {renderCard()}
        </div>
    )
}

export default SituacionPersonal



