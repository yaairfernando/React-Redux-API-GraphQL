import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect } from 'react-redux';

function FavPage({ favorites = [0] }) {
    function renderCharacter(char, i) {
        return (
            <Card hide {...char} key={i} />
        )
    }
    return (
        <div className={styles.container}>
            <h2>Favorites</h2>
            {favorites.map(renderCharacter)}
            {!favorites.length && <h3>There are not any favorites...</h3>}
        </div>
    )
}

const matStateToProps = ({characters:{favorites}}) => {
  return {
    favorites
  }
}

export default connect(matStateToProps)(FavPage);