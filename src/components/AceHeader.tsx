import React, { Component } from 'react';
import { VscSearch } from 'react-icons/vsc';
import { IoMdArrowForward } from 'react-icons/io';
import '../styles/ace-header.scss';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import closeIcon from '../assets/close-icon.svg'

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('api_key', `${process.env.REACT_APP_APIKEY}`);
requestHeaders.set('access_token', `${process.env.REACT_APP_DELIVERY_TOKEN}`);

interface IProps {
}

interface IState {
    topMenu: ILink[],
    isLoading: false,
    joinButton: ILink,
    registerButton: any;
    mainMenu: any[],
    menuContent: any,
    displayMenuContent: string,
    logo: string
}

interface ILink {
    title: string,
    href: string
}

export class AceHeader extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            topMenu: [],
            isLoading: false,
            joinButton: {
                "title": "",
                "href": ""
            },
            registerButton: {},
            mainMenu: [],
            menuContent: {},
            displayMenuContent: "none",
            logo: ''
        }
    }

    async getNavigationMenu() {
        // console.log('get navigation menu');
        let contentTypeUid = 'ace_navigation_menu';
        let entryUid = 'blt1bcec684a6ddcf9a';
    
        let url = `https://cdn.contentstack.io/v3/content_types/${contentTypeUid}/entries/${entryUid}?environment=${process.env.REACT_APP_ENVIRONMENT}`;
    
        try {
          let createGlobalField = await fetch(url, {
            headers: requestHeaders,
          })
      
          let response = await createGlobalField.json();
          console.log(response.entry);
          let entry = response.entry;

          this.setState({
            joinButton: entry.join_aaa_button,
            registerButton: entry.register_log_in_cta,
            topMenu: entry.top_menu,
            mainMenu: entry.main_menu,
            // menuContent: entry.main_menu[0].menu,
            logo: response.entry.aaa_logo.url
          });

        //   console.log(this.state.mainMenu);
      
        } catch(error) {
        //   console.log(error);
          this.setState({
            isLoading: false,
          })
        }
        
    }

    setMenuContent = (event: string) => {


        this.state.mainMenu.forEach((menu: any) => {
            if (menu.Menu_Item.menu_title.title === event) {

                this.setState({
                    menuContent: menu.Menu_Item,
                    displayMenuContent: "block"
                });
                // console.log('got it', this.state.menuContent);
            }
        });
    }

    componentDidMount() {
        this.getNavigationMenu();
    }

    render() {

        let styles = {
            display: this.state.displayMenuContent
        }
        
        return (
            <div>
                <header className="">
                    <a className="aaa-header__logo" href="/" data-trk="MainNavLogo" aria-label="AAA Logo, Home Page">
                        <img src={this.state.logo} alt="AAA Logo" />
                    </a>
                    <div className="top-navigation">
                        <ul className="top-nav">
                            {
                                this.state.topMenu.map((menu: ILink, i) => (
                                    <li key={i}><a href={menu.href}>{menu.title}</a></li>
                                ))
                            }
                            <li>
                                <Button variant="outlined" sx={{ textTransform: 'none' }} disableElevation>{this.state.joinButton.title}</Button>
                            </li>
                            <li>
                                <Button variant="contained" sx={{ textTransform: 'none' }} disableElevation>{this.state.registerButton.button?.title}</Button>
                            </li>
                        </ul>
                    </div>
                    <nav className="main-menu">
                        <ul className="main-nav">
                            {/* {
                                this.state.mainMenu.map((menu: any, index) => (
                                    <li key={index}><a href={menu.url} onClick={() => this.setMenuContent(menu.Menu_Item.menu_title.title)}
                                        >{menu.Menu_Item.menu_title.title}</a></li>
                                ))
                            } */}

                            {
                                this.state.mainMenu.map((menu: any, index) => (
                                    <li key={index}><a href={menu.url} onClick={() => this.setMenuContent(menu.Menu_Item.menu_title.title)}
                                        >{menu.Menu_Item.menu_title.title}</a></li>
                                ))
                            }
                 
                        </ul>
                    </nav>
                    <div className="menu-content" style={styles}>
                        <div className="left-col">
                            <div className="menu-title-block">
                                <span className="menu-title">{this.state.menuContent.menu_title?.title}</span>
                                {
                                    this.state.menuContent.title_links ? this.state.menuContent.title_links.map((link:any, i:number) => (
                                        <a href={link} className="menu-title-link">{link.title}</a>
                                    )) :
                                    <div />
                                }
                            </div>
                            <div className="menu-links-block">
                                {
                                    this.state.menuContent.menu_block ? this.state.menuContent.menu_block.map((menu: any, i:number) => (
                                        <div className="col-links" key={i}>
                                            <span className="menu-label">{menu.menu_title}</span>
                                            <ul>
                                                {menu.link.map((item: any, index:number) => (
                                                    <li key={index}>
                                                        <a href={item.href}>{item.title}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )) :
                                    <div />
                                }
                            </div>
                            <div className="cta-block">
                                <div className="col">
                                    <img src={this.state.menuContent.menu_description?.image[0]?.url}  alt="" />
                                </div>
                                <div className="col">
                                    <h3>{this.state.menuContent.menu_description?.title}</h3>
                                    <Button sx={{ textTransform: 'none' }} color="secondary" size="large" disableElevation variant="contained">{this.state.menuContent.menu_description?.cta_button.title}</Button>
                                </div>
                            </div>
                        </div>
                        <div className="right-col">
                            <IconButton component="span" className="close-btn" onClick={() => this.setState({displayMenuContent: "none"})}><img src={closeIcon} alt="" /></IconButton>
                            {
                                this.state.menuContent.side_menu ? this.state.menuContent.side_menu.map((menu: any) => (
                                    <div>
                                        <h3>{menu.menu_title}</h3>
                                        <ul>
                                        {menu.link.map((item: any, index:number) => (
                                            <li key={index}>
                                                <a href={item.href}>{item.title}</a>
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                )) :
                                <div />
                            }
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default AceHeader