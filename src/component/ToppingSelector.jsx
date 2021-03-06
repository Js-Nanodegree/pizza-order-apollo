import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';

class ToppingSelector extends Component{

    handleChange = (event) => {
        const { target:{checked, id} } = event;
        const { setCurrentPizzaOrder, currentPizza, updateToppingOrder, toppings } = this.props;
        const toppingsToUpdate = toppings.slice();
        const indexTopping = id.split('-')[1];
        toppingsToUpdate[indexTopping].defaultSelected = checked;
        const updatedToppings = toppingsToUpdate.slice();
        updateToppingOrder(updatedToppings);
        const pizzaUpdated = Object.assign({}, currentPizza);
        pizzaUpdated.toppings = updatedToppings;
        setCurrentPizzaOrder(pizzaUpdated);
    };
    isDisabled = (isMaxAlready, defaultSelected) =>{
        if (isMaxAlready && defaultSelected){
            return false;
        } else if (isMaxAlready && !defaultSelected){
            return true;
        }
        return false;
    };
    render() {
        const { currentPizza:{maxToppings, name},toppings } = this.props;
        const selectedCount = toppings && toppings.filter(item => item.defaultSelected).length;
        const isMaxAlready = !(selectedCount < maxToppings) && (maxToppings);
        const isToppings = toppings.length > 0;
        const maxToppingLabel = (maxToppings) ? maxToppings :'Unlimited';
        return (
            <div className="topping-selector">
                { isToppings && <h3>Toppings for {name.toUpperCase()}</h3> }
                { isToppings && <h5>Max allowed: {maxToppingLabel}</h5> }
                {
                    toppings &&
                    toppings.map((pizzaTopping, idx2) => {
                        const { pizzaSize,topping:{name, price}, defaultSelected } = pizzaTopping;
                        return(
                            <Form.Check
                                type="checkbox"
                                key={"topping" + idx2 }
                                id={`topping-${idx2}-${pizzaSize.name.trim()}`}
                                label={`${name} - ${price}`}
                                checked={defaultSelected}
                                onChange={this.handleChange}
                                disabled={this.isDisabled(isMaxAlready, defaultSelected)}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

ToppingSelector.defaultProps = {
    currentPizza: {maxToppings: -1 },
    setCurrentPizzaOrder: (pizza) =>{},
    toppings: []
};

ToppingSelector.propTypes = {
    currentPizza: PropTypes.object,
    toppings: PropTypes.array,
    setCurrentPizzaOrder: PropTypes.func,
    updateToppingOrder: PropTypes.func,
};

export default ToppingSelector;
