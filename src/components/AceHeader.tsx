import React, { Component } from 'react';
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
    logo: string,
    currentZipCode: string,
    joinAAAButtonUrl: string,
    currentRegion: string
}

interface ILink {
    title: string,
    href: string
}

class AceHeader extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        const zipCode = params.get('zip') || '';

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
            logo: '',
            currentZipCode: zipCode.replace(/^[0\.]+/, ""),
            joinAAAButtonUrl: '',
            currentRegion: ''
        }
    }

    async getNavigationMenu() {
        let contentTypeUid = 'ace_navigation_menu';
        let entryUid = 'blt1bcec684a6ddcf9a';
        let url = `${process.env.REACT_APP_CDN_API_URL}/content_types/${contentTypeUid}/entries/${entryUid}?environment=${process.env.REACT_APP_ENVIRONMENT}`;
    
        try {
          let createNavigationMenu = await fetch(url, {
            headers: requestHeaders,
          })
      
          let response = await createNavigationMenu.json();
          let entry = response.entry;

          this.setState({
            joinButton: entry.join_aaa_button,
            registerButton: entry.register_log_in_cta,
            topMenu: entry.top_navigation_menu,
            mainMenu: entry.main_menu,
            logo: response.entry.aaa_logo.url
          });
      
        } catch(error) {
        //   console.log(error);
        } finally {
            this.setState({
                isLoading: false,
            })
        }
    }

    setMenuContent = (menuItem: string) => {
        // console.log(this.state.mainMenu)
        this.state.mainMenu.forEach((menu: any) => {
            if (menu.Menu_Item.menu_title.title === menuItem) {
                this.setState({
                    menuContent: menu,
                    displayMenuContent: "block"
                });
            }
        });
    }

    async handleRegion(zipCode: string) {
        if (zipCode >= '90001' && zipCode <= '96162') {
            this.setState({
                currentRegion: 'blt9f657eb8a467d3f1' // CA
            })
        } else if ((zipCode >= '6001' && zipCode <= '6389')
                || (zipCode >= '6401' && zipCode <= '6928')
                || (zipCode >= '3901' && zipCode <= '4992')
                || (zipCode >= '1001' && zipCode <= '2791')
                || (zipCode >= '5501' && zipCode <= '5544')
                || (zipCode >= '3031' && zipCode <= '3897')
                || (zipCode >= '2801' && zipCode <= '2940')
                || (zipCode >= '2801' && zipCode <= '5495')
                || (zipCode >= '5601' && zipCode <= '5907')
        ) {
            this.setState({
                currentRegion: 'blte2bed0dd4ea75102' // Northern England states
            })
        }
    };

    handleRegistration = () => {
        alert('Register!');
    }
          
    componentDidMount() {
        this.getNavigationMenu();
        this.handleRegion(this.state.currentZipCode)
    }

    render() {

        let styles = {
            display: this.state.displayMenuContent
        }
        
        return (
            <div>
                <header>
                    <a className="aaa-header__logo" href="/" data-trk="MainNavLogo" aria-label="AAA Logo, Home Page">
                        <img src={this.state.logo} alt="AAA Logo" />
                    </a>
                    <input className="search-menu" type="text" placeholder='Search'/>
                    <div className="top-navigation">
                        <ul className="top-nav">
                            {
                                this.state.topMenu.map((menu: any, i) => (
                                    <li key={i}>
                                        <a href={menu.top_menu.href}>
                                        {
                                            menu.icon?.url 
                                            ?
                                            <img className="menu-icon" src={menu.icon?.url} alt="AAA Logo" />
                                            :
                                            null
                                        }
                                        {menu.top_menu.title}
                                        </a>
                                    </li>
                                ))
                            }
                            <li>
                                <Button variant="outlined" sx={{ textTransform: 'none' }} disableElevation>{this.state.joinButton.title}</Button>
                            </li>
                            <li>
                                <select className="register-btn" onChange={this.handleRegistration}>
                                    <option selected disabled>{this.state.registerButton.button?.title}</option>
                                    {
                                        this.state.registerButton.select_option_value?.map((option: string, index: number) => {
                                            return <option key={index}>{option}</option>
                                        })
                                    }
                                </select>
                            </li>
                        </ul>
                    </div>
                    <nav className="main-menu">
                        <ul className="main-nav">
                            {
                                this.state.mainMenu.map((menu: any, index) => (
                                    <li key={index}>
                                        <a href={menu.url} onClick={() => this.setMenuContent(menu.Menu_Item.menu_title.title)}
                                        >{menu.Menu_Item.menu_title.title} 
                                        {
                                            menu.Menu_Item.menu_icon?.url
                                            ?
                                            <img className="menu-icon" src={menu.Menu_Item.menu_icon?.url} alt="AAA Logo" />
                                            :
                                            null
                                        }
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <div className="menu-content" style={styles}>
                        <div className="left-col">
                            <div className="menu-title-block">
                                <span className="menu-title">{this.state.menuContent.Menu_Item?.menu_title.title}</span>
                                {
                                    this.state.menuContent.Menu_Item?.title_links ? this.state.menuContent.Menu_Item?.title_links.map((link:any, i:number) => (
                                        <a key={i} href={link} className="menu-title-link">{link.title}</a>
                                    )) :
                                    <div />
                                }
                            </div>
                            <div className="menu-links-block">
                                <div className="col-links">
                                    {
                                        this.state.menuContent.Menu_Item?.first_column_menu ? this.state.menuContent.Menu_Item?.first_column_menu.menu_block.map((menu: any, i:number) => (
                                            <div className="col-links" key={i}>
                                                <span className="menu-label">{menu.menu_title}</span>
                                                <ul>
                                                    {menu.links.map((link: any, index:number) => {
                                                        return link
                                                            ?
                                                            <li key={index}>
                                                                {
                                                                    link.link.map((item: any, index:number) => {
                                                                        if (item.region.length > 0 && item.region[0].uid === this.state.currentRegion) 
                                                                            return <a key={index} href={item.url}>{link.menu_title}</a>

                                                                        if (item.region.length === 0) 
                                                                            return <a key={index} href={item.url}>{link.menu_title}</a>
                                                                                                                                            
                                                                    })
                                                                }
                                                            </li> 
                                                            :
                                                            null
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        )) :
                                        <div />
                                    }
                                </div>
                                <div className="col-links">
                                {
                                    this.state.menuContent.Menu_Item?.second_column_menu ? this.state.menuContent.Menu_Item?.second_column_menu.menu_block.map((menu: any, i:number) => (
                                        <div className="col-links" key={i}>
                                            <span className="menu-label">{menu.menu_title}</span>
                                            <ul>
                                                {menu.links.map((link: any, index:number) => {
                                                    return link
                                                        ?
                                                        <li key={index}>
                                                            {
                                                                link.link.map((item: any, index:number) => {
                                                                    // console.log(item);
                                                                    if (item.region.length > 0 && item.region[0].uid === this.state.currentRegion) 
                                                                        return <a key={index} href={item.url}>{link.menu_title}</a>

                                                                    if (item.region.length === 0) 
                                                                        return <a key={index} href={item.url}>{link.menu_title}</a>
                                                                })
                                                            }
                                                        </li> 
                                                        :
                                                        null
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    )) :
                                    <div />
                                }
                                </div>
                                <div className="col-links">
                                {
                                    this.state.menuContent.Menu_Item?.third_column_menu ? this.state.menuContent.Menu_Item?.third_column_menu.menu_block.map((menu: any, i:number) => (
                                        <div className="col-links" key={i}>
                                            <span className="menu-label">{menu.menu_title}</span>
                                            <ul>
                                                {menu.links.map((link: any, index:number) => {
                                                    return link
                                                        ?
                                                        <li key={index}>
                                                            {
                                                                link.link.map((item: any, index:number) => {
                                                                    // console.log(item);
                                                                    if (item.region.length > 0 && item.region[0].uid === this.state.currentRegion) 
                                                                        return <a key={index} href={item.url}>{link.menu_title}</a>

                                                                    if (item.region.length === 0) 
                                                                        return <a key={index} href={item.url}>{link.menu_title}</a>
                                                                })
                                                            }
                                                        </li> 
                                                        :
                                                        null
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    )) :
                                    <div />
                                }
                                </div>
                            </div>
                            <div className="cta-block">
                                <div className="col">
                                    <img src={this.state.menuContent.Menu_Item?.menu_description.image[0]?.url}  alt="" />
                                </div>
                                <div className="col">
                                    <h3>{this.state.menuContent.Menu_Item?.menu_description.title}</h3>
                                    <Button sx={{ textTransform: 'none' }} color="secondary" size="large" disableElevation variant="contained">{this.state.menuContent.Menu_Item?.menu_description.cta_button.title}</Button>
                                </div>
                            </div>
                        </div>
                        <div className="right-col">
                            <IconButton component="span" className="close-btn" onClick={() => this.setState({displayMenuContent: "none"})}><img src={closeIcon} alt="" /></IconButton>
                            {
                                this.state.menuContent.Menu_Item?.side_menu ? this.state.menuContent.Menu_Item?.side_menu.map((menu:any, i:number) => (
                                    <div key={i}>
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