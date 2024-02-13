

/**
 * validate request trả về
 */
export function CheckResponseSuccess(res:any) {
    // if (res.status != 200) return false;
    if (res.success != true) return false;

    return true;
}