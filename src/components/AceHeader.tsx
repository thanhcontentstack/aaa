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
    joinAAAButtonUrl: string
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
            joinAAAButtonUrl: ''
        }

    }

    linkRef = React.createRef<HTMLAnchorElement[]>();
    accordionContent:any = [];

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
        //   console.log(response.entry);
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
                console.log('got it', this.state.menuContent);
            }
        });

    }

    trimWhiteSpacesAndLowercase(o: any) {
        return JSON.parse(JSON.stringify(o).replace(/\s/g, "").toLowerCase());
    }

    setRegion = new Promise<any>((resolve, reject) => {
        console.log(this.state.currentZipCode);
        if (this.state.currentZipCode > '90001' && this.state.currentZipCode < '96162') {
            this.setState({
                joinAAAButtonUrl: 'https://apps.calif.aaa.com/aceapps/membership/Join/SelectMembershipLevel?flowName=NewBiz'
            })
            resolve(true)
        } else if (this.state.currentZipCode > '6001' && this.state.currentZipCode < '6389'
                || this.state.currentZipCode > '6401' && this.state.currentZipCode < '6928'
                || this.state.currentZipCode > '3901' && this.state.currentZipCode < '4992'
                || this.state.currentZipCode > '1001' && this.state.currentZipCode < '2791'
                || this.state.currentZipCode > '5501' && this.state.currentZipCode < '5544'
                || this.state.currentZipCode > '3031' && this.state.currentZipCode < '3897'
                || this.state.currentZipCode > '2801' && this.state.currentZipCode < '2940'
                || this.state.currentZipCode > '2801' && this.state.currentZipCode < '5495'
                || this.state.currentZipCode > '5601' && this.state.currentZipCode < '5907'
        ) {
            this.setState({
                joinAAAButtonUrl: 'https://apps.northernnewengland.aaa.com/aceapps/membership/Join/SelectMembershipLevel?flowName=NewBiz'
            })
            resolve(true)
        }
        resolve(true)
        reject()
    })

    setJoinBtn = () => {
        this.accordionContent.forEach((element:any, index:any) => {
            if (element.id === 'joinaaa') {
                element.setAttribute("href", this.state.joinAAAButtonUrl)
            }
        });
    }

    async handleRegion() {
        let setRegion = await new Promise<any>((resolve, reject) => {
            console.log(this.state.currentZipCode);
            if (this.state.currentZipCode >= '90001' && this.state.currentZipCode <= '96162') {
                this.setState({
                    joinAAAButtonUrl: 'https://apps.calif.aaa.com/aceapps/membership/Join/SelectMembershipLevel?flowName=NewBiz'
                })
                resolve(true)
            } else if ((this.state.currentZipCode >= '6001' && this.state.currentZipCode <= '6389')
                    || (this.state.currentZipCode >= '6401' && this.state.currentZipCode <= '6928')
                    || (this.state.currentZipCode >= '3901' && this.state.currentZipCode <= '4992')
                    || (this.state.currentZipCode >= '1001' && this.state.currentZipCode <= '2791')
                    || (this.state.currentZipCode >= '5501' && this.state.currentZipCode <= '5544')
                    || (this.state.currentZipCode >= '3031' && this.state.currentZipCode <= '3897')
                    || (this.state.currentZipCode >= '2801' && this.state.currentZipCode <= '2940')
                    || (this.state.currentZipCode >= '2801' && this.state.currentZipCode <= '5495')
                    || (this.state.currentZipCode >= '5601' && this.state.currentZipCode <= '5907')
            ) {
                this.setState({
                    joinAAAButtonUrl: 'https://apps.northernnewengland.aaa.com/aceapps/membership/Join/SelectMembershipLevel?flowName=NewBiz'
                })
                resolve(true)
            }
            reject()
        });

        console.log(setRegion);
        this.setJoinBtn()
    }
      
    componentDidMount() {
        this.getNavigationMenu();
    }

    componentDidUpdate() {
        this.handleRegion()
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
                                    <li key={index}>
                                        <a href={menu.url} onClick={() => this.setMenuContent(menu.Menu_Item.menu_title.title)}
                                        >{menu.Menu_Item.menu_title.title}</a>
                                    </li>
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
                                        <a key={i} href={link} className="menu-title-link">{link.title}</a>
                                    )) :
                                    <div />
                                }
                            </div>
                            <div className="menu-links-block">
                                <div className="col-links">
                                    {
                                        this.state.menuContent.first_column_menu?.menu_block ? this.state.menuContent.first_column_menu.menu_block.map((menu: any, i:number) => (
                                            <div className="col-links" key={i}>
                                                <span className="menu-label">{menu.menu_title}</span>
                
                                                <ul>
                                                    {menu.link.map((item: any, index:number) => (
                                                        <li key={index}>
                                                            <a ref={linkRef => this.accordionContent[index] = linkRef} id={this.trimWhiteSpacesAndLowercase(item.title)} href={item.href}>{item.title}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )) :
                                        <div />
                                    }
                                </div>
                                <div className="col-links">
                                    {
                                        this.state.menuContent.second_column_menu?.menu_block ? this.state.menuContent.second_column_menu.menu_block.map((menu: any, i:number) => (
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
                                <div className="col-links">
                                    {
                                        this.state.menuContent.third_column_menu?.menu_block ? this.state.menuContent.third_column_menu.menu_block.map((menu: any, i:number) => (
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
                                this.state.menuContent.side_menu ? this.state.menuContent.side_menu.map((menu:any, i:number) => (
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