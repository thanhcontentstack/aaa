import React, { Component } from 'react';
import { VscSearch } from 'react-icons/vsc';
import { IoMdArrowForward } from 'react-icons/io';
import '../styles/header.scss';

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('api_key', `${process.env.REACT_APP_APIKEY}`);
requestHeaders.set('access_token', `${process.env.REACT_APP_DELIVERY_TOKEN}`);

interface IProps {
}

interface IState {
    topMenu: ILink[],
    isLoading: false,
    joinButton: ILink,
    mainMenu: any[],
    menuContent: any,
    displayMenuContent: string,
    logo: string
}

interface ILink {
    title: string,
    href: string
}

export class Header extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            topMenu: [],
            isLoading: false,
            joinButton: {
                "title": "",
                "href": ""
            },
            mainMenu: [],
            menuContent: {},
            displayMenuContent: "none",
            logo: ''
        }
    }

    async getNavigationMenu() {
        console.log('get navigation menu');
        let contentTypeUid = 'navigation_menu';
        let entryUid = 'bltf81a6505347ef813';
    
        let url = `https://cdn.contentstack.io/v3/content_types/${contentTypeUid}/entries/${entryUid}?environment=${process.env.REACT_APP_ENVIRONMENT}`;
    
        try {
          let createGlobalField = await fetch(url, {
            headers: requestHeaders,
          })
      
          let response = await createGlobalField.json();
          console.log(response.entry.aaa_logo.url);
          let entry = response.entry;

          this.setState({
            joinButton: entry.join_button,
            topMenu: entry.top_menu,
            mainMenu: entry.main_menu,
            menuContent: entry.main_menu[0].menu,
            logo: response.entry.aaa_logo.url
          });

          console.log(this.state.menuContent);
      
        } catch(error) {
          console.log(error);
          this.setState({
            isLoading: false,
          })
        }
        
    }

    setMenuContent = (event: string) => {
        this.state.mainMenu.forEach((menu: any) => {
            if (menu.menu.menu_title.title === event) {
                // console.log(menu);
                this.setState({
                    menuContent: menu.menu,
                    displayMenuContent: "block"
                });
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
                        </ul>
                        <button className="join-aaa-btn">{this.state.joinButton.title}</button>
                    </div>
                    <div className="main-menu">
                        <ul className="main-nav">
                            {
                                this.state.mainMenu.map((menu: any, index) => (
                                    <li key={index}><a href={menu.url}
                                        onMouseEnter={() => this.setMenuContent(menu.menu.menu_title.title)}
                                        onMouseOut={() => this.setState({displayMenuContent: "none"})}
                                        >{menu.menu.menu_title.title}</a></li>
                                ))
                            }
                        </ul>
                        <VscSearch className="search-btn" />
                    </div>
                    <div className="menu-content" style={styles}>
                        <div className="content-box">
                            <div className="col-links-row">
                                <div className="col-links">
                                    <ul>
                                        {
                                            this.state.menuContent.first_column_links?.map((link: any, i:number) => (
                                                <li key={i}><a href="">{link.title}</a></li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="col-links">
                                    <ul>
                                        {
                                            this.state.menuContent.second_column_links?.map((link: any, i:number) => (
                                                <li key={i}><a href="">{link.title}</a></li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="description-box-row">
                                <div className="column">
                                    <img alt="" src="https://mwg.aaa.com/nav/v1/assets/images/smart-circle.svg" />
                                </div>
                                <div className="column">
                                    <h1>{this.state.menuContent.menu_description?.title}</h1>
                                    <p>{this.state.menuContent.menu_description?.description}</p>
                                    <a href="#">{this.state.menuContent.menu_description?.cta_link.title} <IoMdArrowForward className="icon" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header