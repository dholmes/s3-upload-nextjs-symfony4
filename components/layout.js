import Head from "next/head";

const Layout = (props) => (
    <div>
        <Head>
            <title>Demo</title>
            <link rel="stylesheet" type="text/css" href="https://bootswatch.com/4/flatly/bootstrap.css" />
        </Head>
        <style jsx>{`
        .break-padding {
            margin-top:30px;
        }`}</style>
        <div className="navbar navbar-expand-lg navbar-dark bg-primary"></div>
        <div className="break-padding"></div>
        <div className="container">
            {props.children}
        </div>
    </div>
);

export default Layout