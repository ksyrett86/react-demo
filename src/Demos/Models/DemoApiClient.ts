import { Model, Data, TaskRunner, Utils } from '@singularsystems/neo-core';
import { AxiosPromise, AxiosResponse } from 'axios';
import { CountryCriteria, CountryLookup } from './Paging';

type CountryWithId = { id: number, country: string };

export default class DemoApiClient {

    constructor() {
        Utils.bindAllMethods(this);
    }

    public getPagedList(request: Model.PartialPlainNonTrackedObject<Data.PageRequest<CountryCriteria>>) : Promise<Data.PageResult<Model.PlainObject<CountryLookup>>> {
        return this.fakeServerMethod(request);
    }

    public async getDropDownList(): Promise<AxiosResponse<CountryWithId[]>> {
        await TaskRunner.delay(2000);
        return { data: countries.slice(0, 30).map((c, i) => ({ id: i, country: c.countryName })) } as any;
    }

    // DemoCode: AsyncDropDownBasic
    // Note: Filtering would usually be done in the database. This code is for demo purposes only.
    public async getCountries(countryName: string): Promise<AxiosResponse<ICountry[]>> {
        await TaskRunner.delay(150);
        return { data: countries.filter(c => c.countryName.toLowerCase().startsWith(countryName.toLowerCase())).slice(0, 30) } as any;
    }
    // End DemoCode

    private async fakeServerMethod(request: Model.PartialPlainNonTrackedObject<Data.PageRequest<CountryCriteria>>) {
        // Note: This is simulating a page request to the server.
        // Usually you would call an api endpoint which accepts a parameter of PageRequest<T>.
        // In the controller, pass the page request to the QueryService.EntitiesPaged method.

        const result = new Data.PageResult<Model.PlainObject<CountryLookup>>();
        result.entityList = countries;
        
        if (request.criteria && request.criteria.countryName) {
            const countryLC = request.criteria.countryName.toLowerCase();
            result.entityList = result.entityList.filter(c => c.countryName.toLowerCase().indexOf(countryLC) >= 0);
        }
        result.total = result.entityList.length;
        
        if (request.sortColumns && request.sortColumns.length) {
            result.entityList = result.entityList.sortBy((request.sortColumns[0] as any).columnName as any, request.sortColumns[0].sortAscending ? "asc" : "desc");
        }
        result.entityList = result.entityList.slice(request.pageIndex! * request.pageSize!, request.pageIndex! * request.pageSize! + request.pageSize!);

        await TaskRunner.delay(500);

        return result;
    }

    public get documentUploadURL(): string {
        return "invalid://localhost/";
    }
    public getDocumentDownloadURL(documentId: string): string {
        return "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    }
}

interface ICountry {
    id: number;
    countryName: string;
    population: number;
    flag?: string;
}

export const countryFlags = {
    ZA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAABBFJREFUSA2tVm1sU1UYfu5H726/1nVutnODsaYyV4bLxuCHqMlM/AFB06mJfxCYBjD8IcZEIyibIX5EfqGixn2oxMVIQpwEXOIPJiUGGcoSlGBcych0sG7dWLr29uN+ee5teu3qOmvX0/Te933P+z7vxznvOZfadtL7xPj1W71iUnJZmAo8VLkXNdz9KJNTAFRYLgVgO/cNKEkifOkGxzAhn8u1l7mnRQhEYimXBi2qCdwSfgIYGW5bMygTB7HBi+TGVnATQdCLkZJFIKuqbV4QHqNGe0iaZPRubUNMYQwHHXV+dDW9AoZidZkSjSK0ezdS164ZOqshvg8GdXM6A/LWmkm0WhcyLEb+GsJLFzsRTkynFW021Jw+Defhw6RC/wRqGBRJ0LsG7Yg1sqgyhfFyzTj2uSYNqLlECAcDT+KHqTOGrHzPHtSOjIBdu9aQrYZgRNncc+o7DkKcwtZNEjzmGDaYRdxMlmFRNunYV2cDGF/4FVtcHWBoFrTdjnKyHKogIJlZEooCcv8rRHZzfl6fpRwOh74HNK7lARl97wjw1itQVBpfzdVieMFtwPCMGa9v/gQN5U2GrFji6PsDoOICGJ7nezIgoTCNwTMcqpwqWn0SHrREUMeJ+E2wkw6hIakSzpO9oagyfM42kjDJusgRuDxGWlvEkgpkY+3oEHH8SByVpEDTKRsG52owFqvIVlkV/ePwFXC0BUYX5KKdHTHh4WdtuDDKws1F9Q2a3SW5+sXyeQPQAO/M0HjqgBXdx3kdf3tFuiWLdbac3YoBaAaKAnz0ZZluu56PLoexKtl/BqCh3+ciUZAxL3H6u1SPhKjm3wMZJ60bZJzri+nsHwlbRlyy94oV2OlPYbg/ijq3onfAZ7PrSuZYAzKbKKRvmhzYMlLp916NY1endiUDFyJV6J1pyNEqDfuvAGrJen9xTMCmZhmySqGfZB0gAWQGx/Do3tKLevv6jCjvm0L+g+ro7wO63ZIAHmmX0P+ugOpKFRNJKz4OeXA7lW5BTdvr2IjX2j8Az1jyOv2/E3oA2ol6YGcSbx5MkMsGGI069ZLHs74PnvHuh9/zPMkpnZVKbpC3v53C15fmVvSp6RmXTZbm9Z/TG5u1WlR82B2H/3FRnz4fqcbAzDpD1URzOLL5U3gcPkO2IMh47kQQE7NJQ1YswQ7tJ59Z5IDTrt6+mXr8EnMaWJ5yHw61n4CZtRqyy8EoXhyYgCgtl5ehVjBh7IE3/mxCWEqfeJp1p+cFPO3dt6Tkx87exsmL4YLBC1Gkmg+x04uCpH+UagY0+bU5/Wip2E649HrHyYk1dDWJG3fkQjAL11Exxq5pbOqavDH5uZgS7+VoKx6t7oKbbzRApu4qOHUlgbtCaUpuABPnYJRtfwN1qFhXFGe9ygAAAABJRU5ErkJggg==",
    DE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAAAJtJREFUSA1jYGBgEAfiy0D8n84YZCfI7gGxHObZy4xQXzOoq6uDHEM3cPPmTbBdTHSzEYdFow4YDQGWXcB8wMzExKD27SuOZEIb4eug/AcEo1EwGgKjITDgIcAiUA/Kjf8YZAL+gBh0A883QKwa8BAYdcBoCLAA0+IVINY5veEF3XIA3CJGhvNM/1gZXIAC1+CC9GIALf/HwuAJAMDtUhMeaA1bAAAAAElFTkSuQmCC",
    US: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAAAAXNSR0IArs4c6QAAAYdJREFUSA1jzBZWid0sGzzvHasICwMIMDOBKYa//yA0EXwmDjaG6iO5EPXEky///2dIZQFZ/pZRkIXhz1+IVhgNM4gIPtSpMB3E0uKMjAyzWcA+B1qyc14KA1CAIabhAtiAxfUGRPOZ2VgYUnf/INZisLop85aCaHFoeDOALQPaDwcgxxDN/w/XRjKDBRznwBAgx+cw25jYmBneGanAuETR7PefgNXBQwCmiySfQzUhhxTMHGJpFlhqJyXOQYYjq//7+y+D0Lk7xNoJVvcTkgYY4CFAqs9R1I+mAZICH1XxaBpg5LHo/f//528GMXkT1LAhgcfKzc6w7VQkCToYGNZCywEWUEUCKstBxSkDMDWDChVQvgZlLWL57LwcJFmOrJilJJCLgZ1dgCE12gJZnAw2heUAGTZSRQtjJwsooBkYghVlqGIgsYbA0gC8JCRWI7XVsfzsnQtMA2wMQtGh1DYbr3kYdQFe1TSUBKWBF0DzxWloBz6jnzGBGoZAFa/wqaKR3DOg3RkAkQetByWulPUAAAAASUVORK5CYII=",
    GB: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAABURJREFUSA3NVgtMFEcY/nZvkZO7E6j4OOypiFBNfCSKnNhqYxpjImpKT7TV2moxbWzri2qsMRRLBWOrNoCPGMVaa7WIJhqlitCXDVUM1sZSsURFLfaOhz04jrvjbnenO3Pu9ogPQprYTjI7//zzP2b+2fm/n5uDlJwxuLLeiA4eSnPnF9EBxXuA32paGB36ycmPYVPjioxQtqb3wYp/dCIiBLy/KaqLnKrnhkG+gjG5fKjzUMmz5XNhsZhCWT2idToOhw7PfqQOPTD1zW0DCJVaPHEUuP4DYcjKhZCUzBSdrSLmzbsJV5ukGSovT4TJpEPjyJGQ29oYn4+MxIDaWrS3S5g2rY7xCgotmJBkAMdxkJub4NmYBfHiT5qdzy7UBHVVjiwTSA47XO9mwFOwBcTvR3SUgKMl8Rg7trcq1u2o1/PYv38okicYmXP/d+Vom58G/4VKUB8ypwOfvlCzw+XkF7EIrCCt8BcfAAJ+tigkPANjzmYIwxMhSQTHjjmxbVsjHhcBr1eG0ykiNrYXSIcb7i156Dx1XHOms05G+PK14AcPVTYj4cSJ6xDU1V5vrYQw0wZf4ccQz30D/7VaOBemw/DOKkQseB02WzRiYgTwPKeqaCNnNDKanp46D/xyCa6stZDuNjA+PyQOesWxkDKFzS9f9mDTpjKcPHmDzjeT6dOPkMrKduL1Sqy3//AjaUybQexjE1i/9+ZrRHTYSSAgEyWMrDlGjCB/ms2sNyYnB5nKoit/C7GPG8H0HM+OI61Fe4nX5WN26+t9pLCwkVitV5Wob2adPb2ysnpkZv6BXbua0dAQgJA8CX2+OA595noQgwne85VosqUiUFGq3Cs7xEM/UkszXHt3QRYlhM2ywXTkDMLnLwbCwlBa2oaMjFs4ePBeF13tH8ha/kaXhe4moa9AZ7Ggf1VVdypd1j8q2MfmLAJdVp7wRMsDL5vNT9T1V3b7/yMC//kVaHmAptOeNNnlUpI4y2FQkgN4Uw9x4/4VCCr6Dfg3r2DQoB6/Avf9V6BFgAIJbYLAITycD753IoN4PCBK2uR6hYPX6x8bJCIGIHu8TIbvreCHEMZoUSTw+eSH6goqfpceqsOaNQORmhoJv19Ge1kp7KuXgRod/Ol2RL+YxgzQoD8qF3GKw0DzbdQvehW+ujo8tWQp+q/LBicIqK72YOtWB1paRGanqipYN7Cf0Gw2KLn5aeZcybdwbFiHO0sWgo+MQsKpMuacXvftOz54Oh5+EvV4+vjhSDxdgT4zUtGyezvqbTMQUDAhJcWAHTuGKGMQN1R5UDSkneKA6/pt8uvU50lVtJFcS08jAaeT5XhRksnXZ5xkypRa4nKJD2LB+PGM19omEl+nxGhZwYW7Wz8hF2P6kEtxFtJ06rSGNSUlfzEcoHigPUPX2dP4/YVJcP9cDfOq95B4uARCVBQ6A7ISHTs+zLajs/P+X69tP0iQjg5GUKBcvOgWaCFDC5HYzNVIOHxUgV4ZNxbMgX1jtnKlEmbOjERx8Wz06xcBLRNaTb2hMxowfHcR+s4KllLKifD20ju4ebNTc/m4ekCtiCIieOTmxcJqNYJXNuK7VY9rr8yFp6YGRmsK4vYcwN5hluCmVcvh8fEY/e055lyJIS5Wu/FS2o0uzlXZ7kaPR8aqlQ3YubMJoihDPzQOoyu+R19bOlwKsl6dOlEzweXAIKkVMeUuC0jI3lCJvNzzmlAo0ZOqmOolJQ1EecU8FH7+JTOjVsV04oZJ4mlp3KGUyGxV+Tw3+dAjnasyPRmrqx0YFrf7ARXq/ApG5f0NP6GR+RiBCV0AAAAASUVORK5CYII=",
    IN: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAAAc9JREFUSA1jvJgpov7y0Yf9v37+kWSgI2BjZ3kuLifgyLjLm+UZvS2H+RPkCBaY5d6hhjBxutBbV59nANnNRBfb8Fgy6oChHQJ//zEz/PtPmR9YzvnOZWBnY2NwjI/Ak1RQpV4//84wv/86w+XTb8ASRlaiDIlFWgwCwuyoCvHwzv1YBJYl2fkgy6tTj4MtZwLqZmRkYDh37DVDU+4phh/f/+KxErsUyQ4A+fz71z8MKgacDPH14gyxNWIMMmrsDCCHLZp0HbsteERJcsDfP//hPrcN5GNgYWNkYOdiYrD24wNbcevyBzxWYZciyQEMwOAGgf9ADHIMDPz5BWGzczDDhIimSXIAMzMjAyjB/f/HwLBv5UeGT2//Mrx7/ofh8PqPYAvVdAWIthimkAXGIJYGpfbH908xPLn1nWFlz2u4NgVVPob4fE04n1gGyQ4AZbW2uVbgBAeKc1Cwg3xOjuUgRzJqtnKBI9DcyoxYR1NF3cljp8DmkJQGqGIzmiGjDhiQEPjz+w84IpiZmRno7gCQ5Q/uPwQ7gI8fWJoCwfM/f/5IwlIlWhqhGRdoL4OcvOwlJhERYUcWVpYXNLMJzWBQsAsJCTJo62pd4mHjdgMAQQeMsfZPOoAAAAAASUVORK5CYII=",
    CN: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAAAo1JREFUSA3tVruO00AUPTN2nGyiXW0KRElDwW9QQ0QFElpoYCuoED9BSUeBQBT7CWwBNRJ/gAR0PIQExSLFm9jxYzjHyTgbFCmJYZeGK43G87j3nHvvcWLzOghuZ658PnEuxBlaZEzeMvaOObQmO2twn6dIhB78ym7f76N0DiVXmo0xsHwOOMucxuxca53pzvRUO+vZ4c8jCFv+C6bgOUdSlihuBhgHZbUWGZnOM46U5xp61l5TqwkohEDICiMGjs+V6D1soRhYDLlOuC9iGgLdOmhXQ2tVq6nNCTBQwSgp55iAW/cimI7B9n6EIU9ESuQWwDat+xKWC8ovug7dRxH6l+fb7QsWF9/twKXA+MkE7kWBMDcY3UorPQQM6jXTRAt1BUTOHANH9xN8f5xM1TZjPHyb4esgxuRpjqAwaFF0VDAErqqpMk21UBPw7C31PHyZzaCn0/BNjvKTqxQvB70RlkO66VELXY6mWpgTYDCRUFb9axEXzOxbCUcu5/c7aPWmoEvbvnSTgdawmoC/KxI7gxbiVxk+X43x5XqM4ofD9l40/Q3gxarnLLtwj6mF0V6KUFXxQTaYax+VUwHblyzSgxzJgwl2xwG6H9iSG0lV9qBDcN5Rv9V39V8Vkx6kC5Hf1Gq5y1Vsgo8EeV+gZ23d5yLn+/8s55qiI7D6rb7LxqyA9KDRxGoCclaIkKVwykZrzgJUpppLnmm//i1ohskIc1skMMviZFy1RuBSu0w9l5MylzXtfeUsf/+w1kxmIleBzsiqbU167/FWEhCAAH3GEttJAj5Q03klAWXXYnT/d/ynGf9OdDUBeoiEgE/DTivu2lz/E/inH6VtYzKrT2N9na7dtL90UeChsXd/ATooHGxnCykhAAAAAElFTkSuQmCC",
    BR: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAABUxJREFUSA29Vm1sU1UYfu5tb3vbdS0dmytjQ9nGNgcaN/GH4teMG6hDNOwPfqJmiSLqD/3hEqPoD0NiiFETEwN+hZioi4gmBiMLi+IiyHDAJAP5iDi3sbLus7T39ra9Pqe3swUmq/zYSU5O7+15z/u8z/u877kS1pashiRtBaRizOkwh2GarRJaFp69cudmGrJ0hdDNYfu/zhtzJYBOk0kgEefKCTq32QCZR8lccx27h4VtMa3+xzCFczqNRQAtjGI5jkgiiSlZBVQPoLgsEFLujMg5u08mAEMDIuPA+BAe9BjovacSh5oqsMIWBiaYyegEEI8BJhnKccwOQESdMKyowyPwTg3ik7oS7FhZjSJVRrlXwY+rl+LNSj+U8QHgfMjam0rPtEb+G83lAYhI4jojm0xFfaei4UjzMjx+bQGjJCPpaZOSaFsewL6matTGydBEkDZTtCXwWdiYGUAqauZaZ67DIagTA9hS5UPHvZUo88iUgYEkWTGTdCAiTc/6IicOrqnB8wEF0vgg2Riz0ibSh5nZuFSEArGgXD/PA0ZRZ49he2M5avwO6LqGiBbHyXPFeLdrPQ4N3wiX044Vi3vx4u2f4mr/IFQWwju3BtB8xoMn9vdjwIgCbj/gFAJVKPwLBco+UGpBa7yKkQihWZTbmO+2ci9eXV4ERZagGwmMTeroPlOK1zs24+AhE2aeAy6fCl++Awv9GtofeQnXFAyJwkyNUS2BDV1D+CJElvILCYKVYndYlZIqQ1Ywar2bUrsXuy26SNuSRAjf3hLAY1VebiA+shKLGQhNRKBU70Lb+mo82uSHO6zhaM8ogmMxjOgKguH5aK7phCyZBGHCRTZaFnuwhIHv6Q9C42mw8UH0i9NML0dGA3QiUXDPLDDQs2ohbhYtwhQisqaEOOxyEu+1j6Nr/yhKS1W89nIFTuy5Cds2BlBt17GzpwqRiEZtZuyE/cOVLhxuCqAhj06FqIXG0iMDgC/sRL6IqVLZYJASGA9Kr3YpAa9Lws7uMO567iTqVx3A1o/+hB6LY+0DRdj7WS02NhciEo0yk+wFF9mXuU20lNgZsWB0JgAUh2Fzou2UDbf9MIwTY2w6JoGkp11OIJ8AWur7UFgxH384PHjhwxCuX/kbtrcP4XDfFHr7OhlEAlKWnbAXZzXsDuLZYxKSNmogS4gZEd49LUKqlh3NfX4Em6tUbKxVmc9pWQFnJsqw7quPcS7sQThiYGxKZ7Ua8OeH8c1DrbhhURB5qgKZwo0nTWw5GsWmUzo0N0Xo9rFds22Le6ODvYIjI8IKKlRmRkSpKE4YdhW7ghp++iuMhkIZPodor0nMc46hsbwTI9ESTMUXoCAfuG/pAXyw5hVcV8IyVCTYmMqeEQP3/xzG9nEVcW+AzudZd4WNzgUDp1nmHBkGsm9DkaPUpWOx4Y2ew9vVDjwp5HzJyORT/MXKwxtHYnjrb+otj1G7vOmoqfws6pEuQ8KZYYiNolycZITrJGl76kQIOwYj2LZcQcCdSUm29d6zSbQeNnBcItV+Nh9HHpXNc6QLtJ5tklWGF7xOP4h6FTkT9M0rwXfGfCzr1PH5aVFmmbtgUmfD+TWGO7olHHcuAHykXGXkoulcxrnwMjMD2WBSbHCbk9GQjRABrTsWwtdno3i/TsIvIyY2/G6i384Lyk+gTjY0wd4sjqddzA4gtZOUT7ORWp34knfF9/s0TCbIkodOHZwUr/VVNHOKpp1mrzkCSJsINkRO02AmxaeZeCeexcwx6osA8OtUfBGnVZn95xz8HmRnNFvpyOoKc+Axy8UgL7mn/wGEwh7+iai8VAAAAABJRU5ErkJggg==",
    ZW: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAAA/VJREFUSA29Vm1MW1UYfu5HO0o3qhsQO1aZLWUoROGfxA2dUTMTZ2TJnNmyVMaQsS3DiBIjUbSLJi4aQ2Aj07jhD122DIakbsuWwJyTzDkZJCUyVxFo6dgKBUrb0c/rObfcmy7jh2wX3+bec+573vM8z33uPbeHqWv4arvfFz6yIi2djwox2Fy/osc7gMUPxg5WeIF78dXX/0hVpfKUkGVY5OmyoVVp8PfMKATyW8TIhMBs4BGBSF5dvhWf7rfiyy8OIBaLgc3XQ1P7EpiHNIuiIfjjNYIrFLASOs/zqP/EitNnzyErKwvx/puYrWlF/IZHKlmUVrz7ZOS160rw29Ue7N1dhfZTbUBdKxo/Ayybk6sevN9DDSAhO5C4TJx1S5fh+2PH0XiwGRyvRXkNUP0REIkmVynTv8eB4TMd8Pb3YXn+U9hRvhPriCOW7dtwsKUX9hbgB8KbrgC3Yw7jLgf8zmGRnOUiYjtytgPm3Fx0XbyE6rffwUWGQTGZ2KOAAAlCFuC192HyT7uY1z9xGVTExFwuNOrEfqsV7R02hB/R43lSRZ1QIuRHMEzuVop0ox0Brx5TozkY+umUmFan6bD+zUpc/v0qdr1VgbIzp0UnPiejnDTxPlpZQIapV5yeae6FRueBoaiTuBAFQ45YeAkRY0bA5USGMQcn29pxuPkQ6j54H0fJ8jUYDOC4hcmw2xNuy48gGtLAUHgByzJHRCHa5WPIfe4EdPp/4PesSuRWZoktQ96FXbv34OdfuvFodjYcDgdmZ2fFsYWeZAcmXWtwZzoDhaVNMsZg90bcdhSJ1w/n5YNLmf+rSAXdb8gOUIAl2mkRZ8ptQjzGQ506I17rn3kWq1/ZJPbpSRAENDU2oGRtMVxOJ0wmE1JSUuTxhXRkB+ikFeTlc1x6DeODT2JpugsrC7pFrDu3x2TMsbGbqKzYia7z51BPsrWhEBifTx7/r53WucIkAQJG+0oQCujAqtXwj6/C0JUNACNg6sZ1etuw2WzYU1UJjHtgIwB0OT5oJD0CRiTXGc143FIJnSkX4WAaIWagzStA9b692LJ5E4yE/AphVYKcipcdKHr3Q4R906DrnYaxdAsiMz70kzf8jTILrg8MoIrkD5BDTQsUClkAxZPIaT8ej6Ppm69h/bgeKj6M7xqAbaV0RJnIOZLAuUuABO12u1FRXoYLXZ0wG4GTh4H8NdKosu09AugegO4FJie94Iofg2vfehQHielz/99K0QdHEoCygIDfj9r3atBylHjDsVBZnoaqtJCsAqUo58dhrIe+jUj7QlrijwZxYrgTQ373/DMUzTLX2FuewR0TvglxrzMSuIXmv9r+N3KyLX/5X2u1Uom2jooSAAAAAElFTkSuQmCC"
}

export const countries: ICountry[] = [
    { id: 1, countryName: 'China', population: 1400418440, flag: countryFlags.CN },
    { id: 2, countryName: 'India', population: 1356005250, flag: countryFlags.IN },
    { id: 3, countryName: 'United States', population: 330404861, flag: countryFlags.US },
    { id: 4, countryName: 'Indonesia', population: 266911900 },
    { id: 5, countryName: 'Pakistan', population: 217923000 },
    { id: 6, countryName: 'Brazil', population: 210842580, flag: countryFlags.BR },
    { id: 7, countryName: 'Nigeria', population: 200963599 },
    { id: 8, countryName: 'Bangladesh', population: 167747434 },
    { id: 9, countryName: 'Russia', population: 146793744 },
    { id: 10, countryName: 'Mexico', population: 126577691 },
    { id: 11, countryName: 'Japan', population: 126140000 },
    { id: 12, countryName: 'Philippines', population: 108664760 },
    { id: 13, countryName: 'Egypt', population: 99745952 },
    { id: 14, countryName: 'Ethiopia', population: 98665000 },
    { id: 15, countryName: 'Vietnam', population: 96208984 },
    { id: 16, countryName: 'DR Congo', population: 86790567 },
    { id: 17, countryName: 'Germany', population: 83073100, flag: countryFlags.DE },
    { id: 18, countryName: 'Iran', population: 83028233 },
    { id: 19, countryName: 'Turkey', population: 82003882 },
    { id: 20, countryName: 'France', population: 67081000 },
    { id: 21, countryName: 'Thailand', population: 66445592 },
    { id: 22, countryName: 'United Kingdom', population: 66435600, flag: countryFlags.GB },
    { id: 23, countryName: 'Italy', population: 60262701 },
    { id: 24, countryName: 'South Africa', population: 58775022, flag: countryFlags.ZA },
    { id: 25, countryName: 'Tanzania', population: 55890747 },
    { id: 26, countryName: 'Myanmar', population: 54339766 },
    { id: 27, countryName: 'South Korea', population: 51811167 },
    { id: 28, countryName: 'Colombia', population: 48258494 },
    { id: 29, countryName: 'Kenya', population: 47564296 },
    { id: 30, countryName: 'Spain', population: 46934632 },
    { id: 31, countryName: 'Argentina', population: 44938712 },
    { id: 32, countryName: 'Algeria', population: 42200000 },
    { id: 33, countryName: 'Sudan', population: 42100655 },
    { id: 34, countryName: 'Ukraine', population: 41960033 },
    { id: 35, countryName: 'Uganda', population: 40006700 },
    { id: 36, countryName: 'Iraq', population: 39127900 },
    { id: 37, countryName: 'Poland', population: 38386000 },
    { id: 38, countryName: 'Canada', population: 37849257 },
    { id: 39, countryName: 'Morocco', population: 35749665 },
    { id: 40, countryName: 'Saudi Arabia', population: 34218169 },
    { id: 41, countryName: 'Uzbekistan', population: 33897379 },
    { id: 42, countryName: 'Malaysia', population: 32690210 },
    { id: 43, countryName: 'Afghanistan', population: 32225560 },
    { id: 44, countryName: 'Venezuela', population: 32219521 },
    { id: 45, countryName: 'Peru', population: 32131400 },
    { id: 46, countryName: 'Ghana', population: 30280811 },
    { id: 47, countryName: 'Angola', population: 30175553 },
    { id: 48, countryName: 'Nepal', population: 29609623 },
    { id: 49, countryName: 'Yemen', population: 29161922 },
    { id: 50, countryName: 'Mozambique', population: 28571310 },
    { id: 51, countryName: 'Cameroon', population: 25876000 },
    { id: 52, countryName: 'Ivory Coast', population: 25823071 },
    { id: 53, countryName: 'Madagascar', population: 25680342 },
    { id: 54, countryName: 'Australia', population: 25551166 },
    { id: 55, countryName: 'North Korea', population: 25450000 },
    { id: 56, countryName: 'Taiwan', population: 23598776 },
    { id: 57, countryName: 'Niger', population: 22314743 },
    { id: 58, countryName: 'Sri Lanka', population: 21803000 },
    { id: 59, countryName: 'Burkina Faso', population: 20870060 },
    { id: 60, countryName: 'Mali', population: 19973000 },
    { id: 61, countryName: 'Romania', population: 19405156 },
    { id: 62, countryName: 'Chile', population: 19107216 },
    { id: 63, countryName: 'Kazakhstan', population: 18606096 },
    { id: 64, countryName: 'Malawi', population: 17563749 },
    { id: 65, countryName: 'Zambia', population: 17381168 },
    { id: 66, countryName: 'Ecuador', population: 17381688 },
    { id: 67, countryName: 'Netherlands', population: 17364848 },
    { id: 68, countryName: 'Syria', population: 17070135 },
    { id: 69, countryName: 'Senegal', population: 16209125 },
    { id: 70, countryName: 'Chad', population: 15692969 },
    { id: 71, countryName: 'Somalia', population: 15442905 },
    { id: 72, countryName: 'Cambodia', population: 15288489 },
    { id: 73, countryName: 'Zimbabwe', population: 15159624, flag: countryFlags.ZW },
    { id: 74, countryName: 'Guatemala', population: 14901286 },
    { id: 75, countryName: 'South Sudan', population: 12778250 },
    { id: 76, countryName: 'Rwanda', population: 12374397 },
    { id: 77, countryName: 'Guinea', population: 12218357 },
    { id: 78, countryName: 'Benin', population: 11733059 },
    { id: 79, countryName: 'Haiti', population: 11577779 },
    { id: 80, countryName: 'Tunisia', population: 11551448 },
    { id: 81, countryName: 'Belgium', population: 11505732 },
    { id: 82, countryName: 'Bolivia', population: 11469896 },
    { id: 83, countryName: 'Cuba', population: 11209628 },
    { id: 84, countryName: 'Burundi', population: 10953317 },
    { id: 85, countryName: 'Greece', population: 10741165 },
    { id: 86, countryName: 'Czech Republic', population: 10668641 },
    { id: 87, countryName: 'Jordan', population: 10569032 },
    { id: 88, countryName: 'Dominican Republic', population: 10358320 },
    { id: 89, countryName: 'Sweden', population: 10319601 },
    { id: 90, countryName: 'Portugal', population: 10276617 },
    { id: 91, countryName: 'Azerbaijan', population: 10027874 },
    { id: 92, countryName: 'Hungary', population: 9772756 },
    { id: 93, countryName: 'United Arab Emirates', population: 9770529 },
    { id: 94, countryName: 'Belarus', population: 9454800 },
    { id: 95, countryName: 'Honduras', population: 9158345 },
    { id: 96, countryName: 'Israel', population: 9129742 },
    { id: 97, countryName: 'Tajikistan', population: 9127000 },
    { id: 98, countryName: 'Austria', population: 8898457 },
    { id: 99, countryName: 'Switzerland', population: 8586550 },
    { id: 100, countryName: 'Papua New Guinea', population: 8558800 },
    { id: 101, countryName: 'Sierra Leone', population: 7901454 },
    { id: 102, countryName: 'Togo', population: 7538000 },
    { id: 103, countryName: 'Hong Kong (China)', population: 7524100 },
    { id: 104, countryName: 'Paraguay', population: 7152703 },
    { id: 105, countryName: 'Laos', population: 7123205 },
    { id: 106, countryName: 'Bulgaria', population: 7000039 },
    { id: 107, countryName: 'Serbia', population: 6963764 },
    { id: 108, countryName: 'Lebanon', population: 6855713 },
    { id: 109, countryName: 'Libya', population: 6777452 },
    { id: 110, countryName: 'El Salvador', population: 6704864 },
    { id: 111, countryName: 'Kyrgyzstan', population: 6490300 },
    { id: 112, countryName: 'Nicaragua', population: 6460411 },
    { id: 113, countryName: 'Turkmenistan', population: 5942089 },
    { id: 114, countryName: 'Denmark', population: 5827463 },
    { id: 115, countryName: 'Singapore', population: 5703600 },
    { id: 116, countryName: 'Finland', population: 5526306 },
    { id: 117, countryName: 'Central African Republic', population: 5496011 },
    { id: 118, countryName: 'Slovakia', population: 5450017 },
    { id: 119, countryName: 'Congo', population: 5380508 },
    { id: 120, countryName: 'Norway', population: 5356789 },
    { id: 121, countryName: 'Costa Rica', population: 5058007 },
    { id: 122, countryName: 'Palestine', population: 4976684 },
    { id: 123, countryName: 'New Zealand', population: 4947581 },
    { id: 124, countryName: 'Ireland', population: 4921500 },
    { id: 125, countryName: 'Oman', population: 4674926 },
    { id: 126, countryName: 'Liberia', population: 4475353 },
    { id: 127, countryName: 'Kuwait', population: 4420110 },
    { id: 128, countryName: 'Panama', population: 4218808 },
    { id: 129, countryName: 'Mauritania', population: 4077347 },
    { id: 130, countryName: 'Croatia', population: 4076246 },
    { id: 131, countryName: 'Georgia', population: 3723464 },
    { id: 132, countryName: 'Uruguay', population: 3518552 },
    { id: 133, countryName: 'Eritrea', population: 3497117 },
    { id: 134, countryName: 'Bosnia and Herzegovina', population: 3301000 },
    { id: 135, countryName: 'Mongolia', population: 3292398 },
    { id: 136, countryName: 'Puerto Rico (US)', population: 3195153 },
    { id: 137, countryName: 'Armenia', population: 2957500 },
    { id: 138, countryName: 'Albania', population: 2862427 },
    { id: 139, countryName: 'Lithuania', population: 2793292 },
    { id: 140, countryName: 'Qatar', population: 2747282 },
    { id: 141, countryName: 'Jamaica', population: 2726667 },
    { id: 142, countryName: 'Moldova', population: 2681735 },
    { id: 143, countryName: 'Namibia', population: 2458936 },
    { id: 144, countryName: 'Gambia', population: 2347706 },
    { id: 145, countryName: 'Botswana', population: 2338851 },
    { id: 146, countryName: 'Gabon', population: 2172579 },
    { id: 147, countryName: 'Slovenia', population: 2089310 },
    { id: 148, countryName: 'North Macedonia', population: 2077132 },
    { id: 149, countryName: 'Lesotho', population: 2007201 },
    { id: 150, countryName: 'Latvia', population: 1909400 },
    { id: 151, countryName: 'Kosovo', population: 1795666 },
    { id: 152, countryName: 'Guinea-Bissau', population: 1604528 },
    { id: 153, countryName: 'Bahrain', population: 1543300 },
    { id: 154, countryName: 'East Timor', population: 1387149 },
    { id: 155, countryName: 'Trinidad and Tobago', population: 1363985 },
    { id: 156, countryName: 'Equatorial Guinea', population: 1358276 },
    { id: 157, countryName: 'Estonia', population: 1324820 },
    { id: 158, countryName: 'Mauritius', population: 1265985 },
    { id: 159, countryName: 'Eswatini', population: 1093238 },
    { id: 160, countryName: 'Djibouti', population: 1078373 },
    { id: 161, countryName: 'Fiji', population: 884887 },
    { id: 162, countryName: 'Cyprus', population: 875900 },
    { id: 163, countryName: 'Comoros', population: 873724 },
    { id: 164, countryName: 'Guyana', population: 782766 },
    { id: 165, countryName: 'Bhutan', population: 741672 },
    { id: 166, countryName: 'Solomon Islands', population: 680806 },
    { id: 167, countryName: 'Macau (China)', population: 676100 },
    { id: 168, countryName: 'Montenegro', population: 622359 },
    { id: 169, countryName: 'Luxembourg', population: 613894 },
    { id: 170, countryName: 'Western Sahara', population: 582463 },
    { id: 171, countryName: 'Suriname', population: 581372 },
    { id: 172, countryName: 'Cape Verde', population: 550483 },
    { id: 173, countryName: 'Malta', population: 493559 },
    { id: 174, countryName: 'Transnistria', population: 469000 },
    { id: 175, countryName: 'Brunei', population: 442400 },
    { id: 176, countryName: 'Belize', population: 408487 },
    { id: 177, countryName: 'Bahamas', population: 385340 },
    { id: 178, countryName: 'Maldives', population: 374775 },
    { id: 179, countryName: 'Iceland', population: 362860 },
    { id: 180, countryName: 'Northern Cyprus', population: 351965 },
    { id: 181, countryName: 'Vanuatu', population: 304500 },
    { id: 182, countryName: 'French Guiana (France)', population: 296711 },
    { id: 183, countryName: 'Barbados', population: 287025 },
    { id: 184, countryName: 'New Caledonia (France)', population: 282200 },
    { id: 185, countryName: 'French Polynesia (France)', population: 275918 },
    { id: 186, countryName: 'Abkhazia', population: 244832 },
    { id: 187, countryName: 'São Tomé and Príncipe', population: 201784 },
    { id: 188, countryName: 'Samoa', population: 200874 },
    { id: 189, countryName: 'Saint Lucia', population: 178696 },
    { id: 190, countryName: 'Guam (US)', population: 172400 },
    { id: 191, countryName: 'Curaçao (Netherlands)', population: 158665 },
    { id: 192, countryName: 'Artsakh', population: 148000 },
    { id: 193, countryName: 'Kiribati', population: 120100 },
    { id: 194, countryName: 'Aruba (Netherlands)', population: 112309 },
    { id: 195, countryName: 'Grenada', population: 112003 },
    { id: 196, countryName: 'Saint Vincent and the Grenadines', population: 110608 },
    { id: 197, countryName: 'Jersey (UK)', population: 106800 },
    { id: 198, countryName: 'U.S. Virgin Islands (US)', population: 104578 },
    { id: 199, countryName: 'F.S. Micronesia', population: 104468 },
    { id: 200, countryName: 'Tonga', population: 100651 },
    { id: 201, countryName: 'Seychelles', population: 97625 },
    { id: 202, countryName: 'Antigua and Barbuda', population: 96453 },
    { id: 203, countryName: 'Isle of Man (UK)', population: 83314 },
    { id: 204, countryName: 'Andorra', population: 76177 },
    { id: 205, countryName: 'Dominica', population: 71808 },
    { id: 206, countryName: 'Cayman Islands (UK)', population: 65813 },
    { id: 207, countryName: 'Bermuda (UK)', population: 64027 },
    { id: 208, countryName: 'Guernsey (UK)', population: 62506 },
    { id: 209, countryName: 'American Samoa (US)', population: 56700 },
    { id: 210, countryName: 'Greenland (Denmark)', population: 56225 },
    { id: 211, countryName: 'Northern Mariana Islands (US)', population: 56200 },
    { id: 212, countryName: 'Marshall Islands', population: 55500 },
    { id: 213, countryName: 'South Ossetia', population: 53532 },
    { id: 214, countryName: 'Saint Kitts and Nevis', population: 52823 },
    { id: 215, countryName: 'Faroe Islands (Denmark)', population: 52122 },
    { id: 216, countryName: 'Turks and Caicos Islands (UK)', population: 41369 },
    { id: 217, countryName: 'Sint Maarten (Netherlands)', population: 40614 },
    { id: 218, countryName: 'Liechtenstein', population: 38557 },
    { id: 219, countryName: 'Monaco', population: 38300 },
    { id: 220, countryName: 'Saint Martin (France)', population: 35746 },
    { id: 221, countryName: 'Gibraltar (UK)', population: 33701 },
    { id: 222, countryName: 'San Marino', population: 33524 },
    { id: 223, countryName: 'British Virgin Islands (UK)', population: 30030 },
    { id: 224, countryName: 'Palau', population: 17900 },
    { id: 225, countryName: 'Cook Islands (NZ)', population: 15200 },
    { id: 226, countryName: 'Anguilla (UK)', population: 14869 },
    { id: 227, countryName: 'Wallis and Futuna (France)', population: 11700 },
    { id: 228, countryName: 'Nauru', population: 11000 },
    { id: 229, countryName: 'Tuvalu', population: 10200 }
];