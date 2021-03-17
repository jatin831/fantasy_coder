import React, { Component } from 'react';
import AceEditor from "react-ace";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,Button,TextField} from 'reactstrap';
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const languages = [
    "c_cpp",
    "javascript",
    "java",
    "python",
    "xml",
    "ruby",
    "sass",
    "markdown",
    "mysql",
    "json",
    "html",
    "handlebars",
    "golang",
    "csharp",
    "elixir",
    "typescript",
    "css"
];

const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal"
];

languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));


const RenderDropdown = ({attrList,attr,attrFunc,toggle,field,name}) => {
    return (
        <Dropdown isOpen={attrList} toggle={toggle} >
            <span> {name} : </span>
            <DropdownToggle color="" caret style={{ minwidth: "80px", textAlign: "left" }}>{attr} </DropdownToggle>
            <DropdownMenu modifiers={{
                setMaxHeight: {
                    enabled: true, order: 890,
                    fn: (data) => { return { ...data, styles: { ...data.styles, overflow: 'auto', maxHeight: '200px', }, }; },
                },
            }}>
                {field.map(option => (
                    <DropdownItem key={option} value={option} onClick={attrFunc}>{option}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modeList: false,
            themeList: false,
            fontSizeList: false,
            mode: "java",
            value: "",
            placeholder: "// Enter Your Code here",
            theme: "monokai",
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            fontSize: 15,
            showGutter: true,
            showPrintMargin: true,
            highlightActiveLine: true,
            enableSnippets: true,
            showLineNumbers: true
        }
        this.onChange = this.onChange.bind(this);
        this.setMode = this.setMode.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
    }
    onChange = (newValue) => {
        console.log("change", newValue);
        this.setState({
            editorCode:{newValue}
        });
    }
    setTheme(e) {
        this.setState({
            themeList: !this.state.themeList,
            theme: e.target.value
        });
    }
    setFontSize(e) {
        this.setState({
            fontSize: parseInt(e.target.value, 10)
        });
    }
    setMode(e) {
        this.setState({
            modeList: !this.state.modeList,
            mode: e.target.value
        });
    }
    render() {
        return (
            <div>
                <div className="row ">
                    <div className="d-flex col-10 offset-1 col-sm-8 offset-sm-2 justify-content-md-center">
                        <h4>Code Editor.</h4>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 my-2 my-sm-1 col-sm-5 col-md-4 col-lg-3 px-0 mx-0">
                        <div className="mx-0 d-flex justify-content-center" >
                            <RenderDropdown attr={this.state.mode} attrList={this.state.modeList} attrFunc={this.setMode}
                                field={languages} name="Languages"
                                toggle={() => { this.setState({ modeList: !this.state.modeList }); }} />
                        </div>
                    </div>
                    <div className="col-12 my-2 my-sm-1 col-sm-5 col-md-4 col-lg-3 px-0 mx-0">
                        <div className="mx-0 d-flex justify-content-center" >
                            <RenderDropdown attr={this.state.theme} attrList={this.state.themeList} attrFunc={this.setTheme}
                                field={themes} name="Themes"
                                toggle={() => { this.setState({ themeList: !this.state.themeList }); }} />
                        </div>
                    </div>
                    <div className="col-12 my-2 my-sm-1 col-sm-5 col-md-3 px-0 mx-0">
                        <div className="mx-0 d-flex justify-content-center" >
                            <RenderDropdown attr={this.state.fontSize} attrList={this.state.fontSizeList} attrFunc={this.setFontSize}
                                field={[14, 15, 16, 17, 18, 19, 20, 24, 28, 32, 40]} name="FontSize"
                                toggle={() => { this.setState({ fontSizeList: !this.state.fontSizeList }); }} />
                        </div>
                    </div>
                </div>
                <div className="row m-1">
                    <div className=" d-flex col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 ">
                        <div className="d-flex justify-content-center border border-dark "
                            style={{ height: "100%", width: "100%", minHeight: "500px", minWidth: "300px" }}>
                            <AceEditor
                                placeholder={this.state.placeholder}
                                mode={this.state.mode}
                                theme={this.state.theme}
                                name="aceEditor"
                                onLoad={this.onLoad}
                                onChange={this.onChange}
                                onSelectionChange={this.onSelectionChange}
                                onCursorChange={this.onCursorChange}
                                onValidate={this.onValidate}
                                value={this.state.value}
                                fontSize={this.state.fontSize}
                                showPrintMargin={this.state.showPrintMargin}
                                showGutter={this.state.showGutter}
                                highlightActiveLine={this.state.highlightActiveLine}
                                height="100%"
                                width="100%"
                                enableSnippets="true"
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    useWorker: false,
                                    enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                                    enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                                    enableSnippets: this.state.enableSnippets,
                                    showLineNumbers: this.state.showLineNumbers,
                                    tabSize: 4
                                }}
                            />
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;