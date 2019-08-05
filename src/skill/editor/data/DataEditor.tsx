import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import React, { useState, useEffect } from 'react';
import './DataEditor.css';
import { List } from 'office-ui-fabric-react/lib/List';
import { TextField } from 'office-ui-fabric-react';

interface IProps {
    data?: any;
    onChange: (data: any) => void;
}
interface IDataItem {
    key: string;
    value: boolean | string | number;
    type: string;
}

export default function DataEditor({ data, onChange: onParentChange }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [dataItems, setDataItems] = useState<IDataItem[]>([]);
    const [resolveList, setResolveList] = useState<List<IDataItem> | undefined>(
        undefined
    );
    useEffect(() => {
        if (!data) {
            return;
        }
        setDataItems(
            Object.keys(data).map(key => ({
                key,
                value: data[key],
                type: typeof data[key],
            }))
        );
    }, [data]);
    const onOpen = () => {
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
    };
    const commandButtons = [
        {
            key: 'newItem',
            name: 'New',
            cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
            iconProps: {
                iconName: 'Add',
            },
            ariaLabel: 'New',
            subMenuProps: {
                items: [
                    {
                        key: 'numberDataItem',
                        name: 'Number',
                    },
                    {
                        key: 'stringDataItem',
                        name: 'Calendar event',
                    },
                    {
                        key: 'boolDataItem',
                        name: 'Boolean',
                    },
                ],
            },
        },
    ];

    const RenderStringDataEditor = ({ item }: { item: IDataItem }) => {
        const onChange = (_: React.FormEvent, newValue?: string) => {
            var newData = Object.assign({}, data, {
                [item.key]: newValue,
            });
            onParentChange(newData);
        };
        return (
            <TextField
                label={`${item.key} (${item.type})`}
                value={`${item.value}`}
                onChange={onChange}
            />
        );
    };

    const onRenderCell = (item?: IDataItem, index?: number): JSX.Element => {
        if (!item) {
            return <></>;
        }
        return (
            <div data-is-focusable={true}>
                <div>
                    {item.type === 'string' && (
                        <RenderStringDataEditor item={item} />
                    )}
                    {item.type === 'number' && 'TODO: RenderNumberDataEditor'}
                    {item.type === 'boolean' && 'TODO: RenderBooleanDataEditor'}
                    {/* <TextField
                        label={`${item.key} (${item.type})`}
                        value={`${item.value}`}
                    /> */}
                </div>
            </div>
        );
    };

    return (
        <>
            <DefaultButton onClick={onOpen}>Open</DefaultButton>
            <Modal
                containerClassName="data-editor-main"
                isOpen={isOpen}
                onDismiss={onClose}
            >
                <CommandBar items={commandButtons} />
                <List items={dataItems} onRenderCell={onRenderCell} />

                <pre>{JSON.stringify(dataItems, null, 4)}</pre>
            </Modal>
        </>
    );
}
