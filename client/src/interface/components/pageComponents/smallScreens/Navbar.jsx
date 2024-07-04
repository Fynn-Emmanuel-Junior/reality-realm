import React, { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Menu from '../../pageComponents/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../../../logic/ReduxStore/features/users/usersSlice';
import { setMenu, selectMenu } from '../../../../logic/ReduxStore/features/menu/menuSlice';
import { CSSTransition } from 'react-transition-group';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const menu = useSelector(selectMenu);

    const handleOpen = () => {
        setOpen(true);
        dispatch(setMenu(true));
    };

    return (
        <nav className={`lg:hidden border-black border-b-[1px] border-opacity-20 text-black flex justify-between items-center pt-2 w-full mx-auto pb-2 bg-white z-30 sticky top-0 border`}>
            <div className="lg:hidden w-11/12 mx-auto flex justify-between items-center">
                <div>
                    <HiOutlineMenu className="text-xl sm:text-3xl md:text-5xl lg:hidden" onClick={handleOpen} />
                </div>
                <div className="font-semibold text-3xl">
                    <Link to="/">Reality-Realm</Link>
                </div>
                <div>
                    {user ? '' : <Link to="/signin" className="font-semibold md:text-2xl md-x:text-3xl">Signin</Link>}
                </div>
            </div>
            <CSSTransition
                in={open}
                timeout={300}
                classNames="menu"
                unmountOnExit
            >
                <Menu open={open} setOpen={setOpen} />
            </CSSTransition>
        </nav>
    );
};

export default Navbar;
