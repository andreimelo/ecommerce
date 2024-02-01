import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../../resources/icons';
import {Link} from 'react-router-dom';

const Table = ({data, onClick, searchFilter, searchValue, linkTo, category}) => {
    return (
        <table className="w-3/5 my-5 min-w-max table-auto text-right">
        { category && data.filter(searchFilter(searchValue)).map((item) =>
            (
                    <tbody key={item._id}>
                        <tr>
                            <td className="text-left">{item.name}</td>
                            <td onClick={()=>onClick(item.slug)}>{icons['delete']}</td>
                            <Link to={`${linkTo}/${item.slug}`}>
                                <td>{icons['edit']}</td>
                            </Link>
                        </tr>
                    </tbody>
        ))}
        </table>
    )
};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    searchFilter: PropTypes.func,
    searchValue: PropTypes.string,
    linkTo: PropTypes.string,
    category: PropTypes.bool,
}

Table.defaultProps = {
    data: [],
    onClick: ()=>{},
    searchFilter: ()=>{},
    searchValue: '',
    linkTo: '',
    category: false,
}

export default React.memo(Table);