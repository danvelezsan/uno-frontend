export default (theme) => ({
    border: {
        border: `1px solid ${theme.palette.primary.main}`
    },
    button: {
        borderRadius: '2px',
        height: '100%',
        margin: theme.spacing(1, 2, 1, 0),
        padding: theme.spacing(1.8, 2)
    },
    buttonContainer: {
        margin: theme.spacing(1.5, 1, 1, 1),
        height: '100%'
    },
    buttons: {
        fontWeight: 'bold'
    },
    form: {
        marginBottom: theme.spacing(0.5)
    },
    history: {
        display: 'flex'
    },
    padding: {
        padding: theme.spacing(1)
    },
    paddingTop: {
        paddingTop: theme.spacing(1)
    },
    biggerPaddingTop: {
        paddingTop: theme.spacing(3)
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'flex-start'
    },
    titleContainer: {
        marginBottom: theme.spacing(2)
    },
    titleList: {
        marginBottom: theme.spacing(1)
    },
    image: {
        width: 'calc(100% - 32px)',
        height: '90%',
        border: `1px dashed ${theme.palette.primary.main}`,
        borderRadius: '2px',
        cursor: 'pointer',
        boxSizing: 'border-box',
        minWidth: '480px',
        minHeight: '250px'
    },
    img: {
        width: 'calc(100% - 32px)',
        height: '90%',
        display: 'block',
        maxWidth: '15rem',
        maxHeight: '80%'
    },
    inputRoot: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '2px',
        padding: theme.spacing(1.75, 2.5),
        margin: theme.spacing(3, 0)
    },
    normalFont: {
        fontWeight: 'normal'
    },
    inputWidth: {
        width: '100%',
        marginBottom: theme.spacing(1),
        fontSize: '24px'
    }
});
